import { View, Text, TextInput, Pressable, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useSessionStore } from '@/store/sessionStore';
import { useAlertStore } from '@/store/alertStore';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Alert from '@/components/Alert';
import { Config } from '@/enum/config';

export default function CrearClase() {
  const router = useRouter();
  const { session } = useSessionStore();
  const { showAlert } = useAlertStore();
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [institucionId, setInstitucionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInstitution = async () => {
      if (!session?.user?.id) return;
      try {
        const res = await axios.get(
          `http://${Config.IP}:${Config.PORT}/institucion/owner/${session.user.id}`
        );
        if (res?.data?.data) {
          setInstitucionId(res.data.data.id);
        }
      } catch (e: any) {
        console.log('No institution found for user', e?.message || e);
        setInstitucionId(null);
      }
    };
    fetchInstitution();
  }, [session?.user?.id]);

  const handleSubmit = async () => {
    if (!titulo.trim() || !descripcion.trim()) {
      showAlert('Por favor, completá todos los campos.', 'error');
      return;
    }

    if (!institucionId) {
      showAlert(
        'No se encontró la institución asociada. Asegurate de registrar la institución primero.',
        'error'
      );
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `http://${Config.IP}:${Config.PORT}/institucion/clases/create`,
        {
          titulo,
          descripcion,
          institucion: institucionId, // use institution id (FK)
        }
      );

      console.log(response.data);

      showAlert('Clase creada con éxito 🎉', 'success');
      setTitulo('');
      setDescripcion('');
      router.back();
    } catch (error) {
      console.log(error);
      showAlert('Ocurrió un error al crear la clase.', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (institucionId === null) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-600">Buscando institución asociada…</Text>
      </View>
    );
  }

  return (
    <View className="mt-12 items-center justify-center bg-gray-100 px-6">
      <Alert />

      <View className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
        <Text className="mb-6 text-center text-3xl font-bold text-blue-600">Crear clase</Text>

        <Text className="mb-2 text-gray-700">Título</Text>
        <TextInput
          placeholder="La mejor clase"
          className="mb-4 rounded-xl border border-gray-300 px-4 py-3 text-gray-800"
          value={titulo}
          onChangeText={setTitulo}
        />

        <Text className="mb-2 text-gray-700">Descripción</Text>
        <TextInput
          className="text-top mb-8 h-24 rounded-lg border border-gray-300 px-3 py-2"
          multiline
          placeholder="Esta es la mejor clase"
          value={descripcion}
          onChangeText={setDescripcion}
        />

        <Pressable
          onPress={handleSubmit}
          className="rounded-xl bg-blue-600 py-3"
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-center text-lg font-semibold text-white">Crear</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}
