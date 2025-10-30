// app/(profesor)/_layout.tsx
import '@/global.css';
import { Stack, useRouter } from 'expo-router';
import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen options={{ headerShown: false }} name="index" />
      <Stack.Screen options={{ title: 'Crear clase' }} name="CrearClase" />
      <Stack.Screen options={{ title: 'Subir contenido' }} name="SubirContenido" />
      <Stack.Screen
        name="[id]"
        options={{
          title: 'Detalles de la clase',
          // 🔙 Forzar botón atrás
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
