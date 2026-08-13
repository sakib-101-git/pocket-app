import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pocket</Text>
      <Text style={styles.subtitle}>Login screen — placeholder</Text>
      <Link href="/accounts" style={styles.link}>
        Continue to Accounts →
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0B1626", alignItems: "center", justifyContent: "center", padding: 24 },
  title: { color: "#EDE6D6", fontSize: 28, fontWeight: "700", marginBottom: 8 },
  subtitle: { color: "#8CA0BC", fontSize: 14, marginBottom: 24 },
  link: { color: "#E8A33D", fontSize: 16, fontWeight: "600" },
});