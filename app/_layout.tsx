import { Stack } from "expo-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { View, ActivityIndicator } from "react-native";

function RootNavigator() {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: "#0B1626", alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color="#E8A33D" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#0B1626" },
        headerTintColor: "#EDE6D6",
        contentStyle: { backgroundColor: "#0B1626" },
      }}
    >
      <Stack.Protected guard={!!token}>
        <Stack.Screen name="accounts/index" />
        <Stack.Screen name="accounts/[id]" />
        <Stack.Screen name="summary" />
      </Stack.Protected>
      <Stack.Protected guard={!token}>
        <Stack.Screen name="index" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </QueryClientProvider>
  );
}