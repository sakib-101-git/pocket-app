import { View, Text, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import { useAuth } from "../context/AuthContext";

export default function AccountsScreen() {
  const { logout } = useAuth();

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

      <Pressable onPress={logout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0B1626", alignItems: "center", justifyContent: "center", padding: 24, gap: 16 },
  title: { color: "#EDE6D6", fontSize: 24, fontWeight: "700" },
  subtitle: { color: "#8CA0BC", fontSize: 13, marginBottom: 8 },
  link: { color: "#E8A33D", fontSize: 16, fontWeight: "600" },
  logoutButton: { marginTop: 24 },
  logoutText: { color: "#DD7A56", fontSize: 14, fontWeight: "600" },
});