import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function AccountsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Accounts</Text>
      <Text style={styles.subtitle}>Placeholder — real data comes in Frontend M4</Text>
      <Link href="/transactions" style={styles.link}>
        View Transactions →
      </Link>
      <Link href="/summary" style={styles.link}>
        View Summary →
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0B1626", alignItems: "center", justifyContent: "center", padding: 24, gap: 16 },
  title: { color: "#EDE6D6", fontSize: 24, fontWeight: "700" },
  subtitle: { color: "#8CA0BC", fontSize: 13, marginBottom: 8 },
  link: { color: "#E8A33D", fontSize: 16, fontWeight: "600" },
});