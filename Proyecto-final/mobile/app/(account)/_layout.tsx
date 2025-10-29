import '@/global.css';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="CompleteProfile" />
      <Stack.Screen name="EditProfile" />
    </Stack>
  );
}
