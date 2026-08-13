import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../config/api";

async function fetchHealth() {
  const response = await fetch(`${API_BASE_URL}/actuator/health`);
  return response.json();
}

export default function LoginScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["health"],
    queryFn: fetchHealth,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pocket</Text>
      <Text style={styles.subtitle}>Login screen — placeholder</Text>

      <View style={styles.statusBox}>
        {isLoading && <Text style={styles.statusText}>Checking backend…</Text>}
        {error && <Text style={styles.statusError}>Backend unreachable</Text>}
        {data && <Text style={styles.statusOk}>Backend: {data.status}</Text>}
      </View>

      <Link href="/accounts" style={styles.link}>
        Continue to Accounts →
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0B1626", alignItems: "center", justifyContent: "center", padding: 24 },
  title: { color: "#EDE6D6", fontSize: 28, fontWeight: "700", marginBottom: 8 },
  subtitle: { color: "#8CA0BC", fontSize: 14, marginBottom: 16 },
  statusBox: { marginBottom: 24 },
  statusText: { color: "#8CA0BC", fontSize: 13 },
  statusError: { color: "#DD7A56", fontSize: 13, fontWeight: "600" },
  statusOk: { color: "#49D3AC", fontSize: 13, fontWeight: "600" },
  link: { color: "#E8A33D", fontSize: 16, fontWeight: "600" },
});