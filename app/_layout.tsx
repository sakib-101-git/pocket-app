import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#0B1626" },
        headerTintColor: "#EDE6D6",
        contentStyle: { backgroundColor: "#0B1626" },
      }}
    />
  );
}