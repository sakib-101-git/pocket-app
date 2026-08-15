import { View, Text, StyleSheet, Pressable, FlatList, ActivityIndicator } from "react-native";
import { Link } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { authenticatedFetch } from "../../lib/api";
import { LinkBankButton } from "../../components/LinkBankButton";

type Account = {
  id: number;
  name: string;
  accountType: string;
};

export default function AccountsScreen() {
  const { logout } = useAuth();

  const { data, isLoading, error } = useQuery<Account[]>({
    queryKey: ["accounts"],
    queryFn: () => authenticatedFetch("/accounts"),
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Accounts</Text>
        <Pressable onPress={logout}>
          <Text style={styles.logoutText}>Log out</Text>
        </Pressable>
        <LinkBankButton />
      </View>

      {isLoading && <ActivityIndicator color="#E8A33D" style={{ marginTop: 24 }} />}

      {error && <Text style={styles.error}>Could not load accounts.</Text>}

      {data && data.length === 0 && (
        <Text style={styles.empty}>No accounts yet.</Text>
      )}

      {data && data.length > 0 && (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Link href={`/accounts/${item.id}`} asChild>
              <Pressable style={styles.card}>
                <Text style={styles.cardName}>{item.name}</Text>
                <Text style={styles.cardType}>{item.accountType}</Text>
              </Pressable>
            </Link>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0B1626", padding: 20 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  title: { color: "#EDE6D6", fontSize: 24, fontWeight: "700" },
  logoutText: { color: "#DD7A56", fontSize: 13, fontWeight: "600" },
  error: { color: "#DD7A56", fontSize: 14, marginTop: 24, textAlign: "center" },
  empty: { color: "#8CA0BC", fontSize: 14, marginTop: 24, textAlign: "center" },
  list: { gap: 10, paddingBottom: 24 },
  card: { backgroundColor: "#122238", borderColor: "#20395A", borderWidth: 1, borderRadius: 10, padding: 16 },
  cardName: { color: "#EDE6D6", fontSize: 16, fontWeight: "600" },
  cardType: { color: "#8CA0BC", fontSize: 13, marginTop: 4, textTransform: "capitalize" },
});