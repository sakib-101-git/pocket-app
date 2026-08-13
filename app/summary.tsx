import { View, Text, StyleSheet } from "react-native";

export default function SummaryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monthly Summary</Text>
      <Text style={styles.subtitle}>Placeholder — real data comes later</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0B1626", alignItems: "center", justifyContent: "center", padding: 24 },
  title: { color: "#EDE6D6", fontSize: 24, fontWeight: "700" },
  subtitle: { color: "#8CA0BC", fontSize: 13, marginTop: 8 },
});