import { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, Platform, ActivityIndicator } from "react-native";
import { usePlaidLink } from "react-plaid-link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authenticatedFetch } from "../lib/api";

export function LinkBankButton() {
  const queryClient = useQueryClient();
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [accountId, setAccountId] = useState<number | null>(null);

  const getLinkTokenMutation = useMutation({
    mutationFn: () => authenticatedFetch("/accounts/link/token", { method: "POST" }),
    onSuccess: (data) => setLinkToken(data.linkToken),
  });

  const exchangeMutation = useMutation({
    mutationFn: (publicToken: string) =>
      authenticatedFetch("/accounts/link/exchange", {
        method: "POST",
        body: {
          publicToken,
          accountName: "Linked Account",
          accountType: "checking",
        },
      }),
    onSuccess: (data) => {
      setAccountId(data.id);
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      syncMutation.mutate(data.id);
    },
  });

  const syncMutation = useMutation({
    mutationFn: (id: number) => authenticatedFetch(`/accounts/${id}/sync`, { method: "POST" }),
  });

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: (publicToken) => {
      exchangeMutation.mutate(publicToken);
    },
    onExit: () => {
      setLinkToken(null);
    },
  });

  useEffect(() => {
    if (ready && linkToken) {
      open();
    }
  }, [ready, linkToken]);

  const statusQuery = useQuery({
    queryKey: ["syncStatus", accountId],
    queryFn: () => authenticatedFetch(`/accounts/${accountId}/sync/status`),
    enabled: !!accountId,
    refetchInterval: (query) => (query.state.data?.status === "COMPLETED" ? false : 2000),
  });

  useEffect(() => {
    if (statusQuery.data?.status === "COMPLETED" && accountId) {
      queryClient.invalidateQueries({ queryKey: ["transactions", accountId.toString()] });
    }
  }, [statusQuery.data?.status]);

  if (Platform.OS !== "web") {
    return (
      <View style={styles.notice}>
        <Text style={styles.noticeText}>Bank linking is available on web for now.</Text>
      </View>
    );
  }

  const isBusy = getLinkTokenMutation.isPending || exchangeMutation.isPending;
  const status = statusQuery.data?.status;

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        disabled={isBusy}
        onPress={() => getLinkTokenMutation.mutate()}
      >
        {isBusy ? (
          <ActivityIndicator color="#1A1206" />
        ) : (
          <Text style={styles.buttonText}>Link Bank Account</Text>
        )}
      </Pressable>

      {accountId && status && status !== "COMPLETED" && (
        <Text style={styles.statusText}>Syncing transactions…</Text>
      )}
      {status === "COMPLETED" && (
        <Text style={styles.statusSuccess}>Synced!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20, gap: 8 },
  button: { backgroundColor: "#E8A33D", borderRadius: 8, paddingVertical: 12, alignItems: "center" },
  buttonText: { color: "#1A1206", fontWeight: "700", fontSize: 15 },
  statusText: { color: "#8CA0BC", fontSize: 13 },
  statusSuccess: { color: "#49D3AC", fontSize: 13, fontWeight: "600" },
  notice: { backgroundColor: "#122238", borderColor: "#20395A", borderWidth: 1, borderRadius: 8, padding: 12, marginBottom: 20 },
  noticeText: { color: "#8CA0BC", fontSize: 13, textAlign: "center" },
});