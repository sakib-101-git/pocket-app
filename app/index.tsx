import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config/api";

async function loginRequest(credentials: { email: string; password: string }) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    throw new Error("Invalid email or password");
  }
  return response.json();
}

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const loginMutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      login(data.token);
    },
  });

  const handleLogin = () => {
    if (!email || !password) return;
    loginMutation.mutate({ email, password });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pocket</Text>
      <Text style={styles.subtitle}>Log in to continue</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#8CA0BC"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#8CA0BC"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {loginMutation.isError && (
        <Text style={styles.error}>{loginMutation.error.message}</Text>
      )}

      <Pressable style={styles.button} onPress={handleLogin} disabled={loginMutation.isPending}>
        <Text style={styles.buttonText}>
          {loginMutation.isPending ? "Logging in…" : "Log In"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0B1626", alignItems: "center", justifyContent: "center", padding: 24 },
  title: { color: "#EDE6D6", fontSize: 28, fontWeight: "700", marginBottom: 8 },
  subtitle: { color: "#8CA0BC", fontSize: 14, marginBottom: 24 },
  input: { width: "100%", backgroundColor: "#122238", borderColor: "#20395A", borderWidth: 1, borderRadius: 8, padding: 12, color: "#EDE6D6", marginBottom: 12 },
  error: { color: "#DD7A56", fontSize: 13, marginBottom: 12 },
  button: { backgroundColor: "#E8A33D", borderRadius: 8, paddingVertical: 12, paddingHorizontal: 32, marginTop: 8 },
  buttonText: { color: "#1A1206", fontWeight: "700", fontSize: 15 },
});