import { View, Text, TextInput, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSessionStore } from '@/store/sessionStore';
import { useAlertStore } from '@/store/alertStore';
import { useState } from 'react';
import axios from 'axios';
import Alert from '@/components/Alert';
import { Config } from '@/enum/config';

const topics = ['Tecnología', 'Salud', 'Educación', 'Negocios', 'Arte', 'Ciencia'];

export default function CrearClase() {
  const router = useRouter();
  const { session } = useSessionStore();
  const { showAlert } = useAlertStore();
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleSubmit = async () => {
    if (!titulo.trim() || !descripcion.trim()) {
      showAlert('Por favor, completá todos los campos.', 'error');
      return;
    }

    if (selectedTopics.length === 0) {
      showAlert('Seleccioná al menos un tópico.', 'error');
      return;
    }

    try {
      const response = await axios.post(
        `http://${Config.IP}:${Config.PORT}/profesor/class/create`,
        {
          titulo,
          descripcion,
          topics: selectedTopics,
          profesor: session?.user?.id,
        }
      );

      console.log(response.data);

      showAlert('Clase creada con éxito 🎉', 'success');
      setTitulo('');
      setDescripcion('');
      setSelectedTopics([]);
    } catch (error) {
      console.log(error);
      showAlert('Ocurrió un error al crear la clase.', 'error');
    }
  };

  return (
    <View className="mt-12 items-center justify-center bg-gray-100 px-6">
      {/* Alert global (se puede dejar fijo en el root layout también) */}
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

        <Text className="mb-2 font-medium text-gray-700">Elegí tus tópicos de interés</Text>
        <View className="mb-4 flex-row flex-wrap">
          {topics.map((t) => (
            <Pressable
              key={t}
              onPress={() => toggleTopic(t)}
              className={`m-1 rounded-full border px-4 py-2 ${
                selectedTopics.includes(t) ? 'border-green-500 bg-green-500' : 'border-gray-300'
              }`}>
              <Text className={selectedTopics.includes(t) ? 'text-white' : 'text-gray-700'}>
                {t}
              </Text>
            </Pressable>
          ))}
        </View>

        <Pressable onPress={handleSubmit} className="rounded-xl bg-blue-600 py-3">
          <Text className="text-center text-lg font-semibold text-white">Crear</Text>
        </Pressable>
      </View>
    </View>
  );
}
