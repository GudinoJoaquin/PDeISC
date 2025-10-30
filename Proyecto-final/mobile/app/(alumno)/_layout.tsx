import '@/global.css';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen options={{ headerShown: false }} name="index" />
      <Stack.Screen options={{ title: 'Crear clase' }} name="CrearClase" />
      <Stack.Screen options={{ title: 'Subir contenido' }} name="SubirContenido" />
      <Stack.Screen options={{ title: 'Detalles de la clase', headerShown: false }} name="[id]" />
    </Stack>
  );
}
