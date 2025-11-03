import { View, Text, TextInput, Pressable } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { useSessionStore } from '@/store/sessionStore';
import { useAlertStore } from '@/store/alertStore';
import Alert from '@/components/Alert';
import { Config } from '@/enum/config';

export default function RegistrarInstitucion() {
  const { session } = useSessionStore();
  const { showAlert } = useAlertStore();
  const router = useRouter();

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = async () => {
    if (!nombre.trim() || !descripcion.trim()) {
      showAlert('Completá todos los campos', 'error');
      return;
    }

    try {
      const response = await axios.post(`http://${Config.IP}:${Config.PORT}/institucion/register`, {
        nombre,
        descripcion,
        encargado: session?.user?.id,
      });

      console.log(response.data);
      showAlert('Institución creada con éxito', 'success');
      setNombre('');
      setDescripcion('');
      // volver al perfil para que se refresque la vista
      router.back();
    } catch (error) {
      console.log(error);
      showAlert('Error creando institución', 'error');
    }
  };

  return (
    <View className="mt-12 items-center justify-center bg-gray-100 px-6">
      <Alert />
      <View className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
        <Text className="mb-6 text-center text-3xl font-bold text-blue-600">
          Registrar institución
        </Text>

        <Text className="mb-2 text-gray-700">Nombre</Text>
        <TextInput
          placeholder="Nombre de la institución"
          className="mb-4 rounded-xl border border-gray-300 px-4 py-3 text-gray-800"
          value={nombre}
          onChangeText={setNombre}
        />

        <Text className="mb-2 text-gray-700">Descripción</Text>
        <TextInput
          className="text-top mb-8 h-24 rounded-lg border border-gray-300 px-3 py-2"
          multiline
          placeholder="Descripción"
          value={descripcion}
          onChangeText={setDescripcion}
        />

        <Pressable onPress={handleSubmit} className="rounded-xl bg-blue-600 py-3">
          <Text className="text-center text-lg font-semibold text-white">Registrar</Text>
        </Pressable>
      </View>
    </View>
  );
}
