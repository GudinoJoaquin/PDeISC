// app/(profesor)/_layout.tsx
import '@/global.css';
import { Stack } from 'expo-router';
import Header from '@/components/Header';

export default function Layout() {

  return (
    <Stack>
      <Stack.Screen options={{ headerShown: false }} name="index" />
      <Stack.Screen options={{ title: 'Crear clase' }} name="CrearClase" />
      <Stack.Screen options={{ title: 'Subir contenido' }} name="SubirContenido" />
      <Stack.Screen
        name="[id]"
        options={{
          title: '',
          headerLeft: () => <Header title="Detalles de la clase" />,
        }}
      />
    </Stack>
  );
}
