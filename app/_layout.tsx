import { Stack } from "expo-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/queryClient";

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#0B1626" },
          headerTintColor: "#EDE6D6",
          contentStyle: { backgroundColor: "#0B1626" },
        }}
      />
    </QueryClientProvider>
  );
}