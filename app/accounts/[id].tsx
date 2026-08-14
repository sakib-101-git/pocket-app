import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import { authenticatedFetch } from "../../lib/api";

type Transaction = {
  id: number;
  amount: number;
  description: string;
  transactionDate: string;
  category: string | null;
};

type TransactionPage = {
  content: Transaction[];
  number: number;
  totalPages: number;
};

export default function TransactionsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const query = useInfiniteQuery<TransactionPage>({
    queryKey: ["transactions", id],
    queryFn: ({ pageParam }) =>
      authenticatedFetch(`/accounts/${id}/transactions?page=${pageParam}&size=20`),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.number + 1;
      return nextPage < lastPage.totalPages ? nextPage : undefined;
    },
  });

  const allTransactions = query.data?.pages.flatMap((page) => page.content) ?? [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transactions</Text>

      {query.isLoading && <ActivityIndicator color="#E8A33D" style={{ marginTop: 24 }} />}

      {query.error && <Text style={styles.error}>Could not load transactions.</Text>}

      {!query.isLoading && allTransactions.length === 0 && (
        <Text style={styles.empty}>No transactions yet.</Text>
      )}

      <FlatList
        data={allTransactions}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.rowDescription}>{item.description}</Text>
              <Text style={styles.rowCategory}>{item.category ?? "Uncategorized"}</Text>
            </View>
            <Text style={styles.rowAmount}>${item.amount.toFixed(2)}</Text>
          </View>
        )}
        onEndReached={() => {
          if (query.hasNextPage) query.fetchNextPage();
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          query.isFetchingNextPage ? <ActivityIndicator color="#E8A33D" style={{ marginVertical: 16 }} /> : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0B1626", padding: 20 },
  title: { color: "#EDE6D6", fontSize: 24, fontWeight: "700", marginBottom: 16 },
  error: { color: "#DD7A56", fontSize: 14, marginTop: 24, textAlign: "center" },
  empty: { color: "#8CA0BC", fontSize: 14, marginTop: 24, textAlign: "center" },
  list: { gap: 8, paddingBottom: 24 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#122238", borderColor: "#20395A", borderWidth: 1, borderRadius: 10, padding: 14 },
  rowDescription: { color: "#EDE6D6", fontSize: 15, fontWeight: "600" },
  rowCategory: { color: "#8CA0BC", fontSize: 12, marginTop: 2, textTransform: "capitalize" },
  rowAmount: { color: "#49D3AC", fontSize: 15, fontWeight: "700" },
});