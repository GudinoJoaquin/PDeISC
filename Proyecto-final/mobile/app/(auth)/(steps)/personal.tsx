import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { useRegisterStore } from '@/store/registerStore';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function PersonalInfo() {
  const { setInfo } = useRegisterStore();
  const router = useRouter();
  const [data, setData] = useState({
    name: '',
    surname: '',
    nationality: '',
    birthdate: '',
  });

  const handleSave = () => {
    console.log('Información guardada');
    setInfo(data.name, data.surname, data.nationality, data.birthdate);
    router.push(`/(auth)/(steps)/topics`);
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      className="bg-gray-100 px-6">
      <View className="w-full max-w-sm self-center rounded-2xl bg-white p-6 shadow-lg">
        <Text className="mb-6 text-center text-3xl font-bold text-blue-600">
          Información personal
        </Text>

        {/* Nombre */}
        <Text className="mb-2 text-gray-700">Nombre</Text>
        <TextInput
          placeholder="Juan"
          className="mb-4 rounded-xl border border-gray-300 px-4 py-3 text-gray-800"
          onChangeText={(e) => setData((prev) => ({ ...prev, name: e }))}
        />

        {/* Apellido */}
        <Text className="mb-2 text-gray-700">Apellido</Text>
        <TextInput
          placeholder="Pérez"
          className="mb-4 rounded-xl border border-gray-300 px-4 py-3 text-gray-800"
          onChangeText={(e) => setData((prev) => ({ ...prev, surname: e }))}
        />

        {/* Nacionalidad */}
        <Text className="mb-2 text-gray-700">Nacionalidad</Text>
        <TextInput
          placeholder="Argentina"
          className="mb-4 rounded-xl border border-gray-300 px-4 py-3 text-gray-800"
          onChangeText={(e) => setData((prev) => ({ ...prev, nationality: e }))}
        />

        {/* Fecha de nacimiento */}
        <Text className="mb-2 text-gray-700">Fecha de nacimiento</Text>
        <TextInput
          placeholder="DD/MM/AAAA"
          className="mb-4 rounded-xl border border-gray-300 px-4 py-3 text-gray-800"
          onChangeText={(e) => setData((prev) => ({ ...prev, birthdate: e }))}
        />

        {/* Botón Guardar */}
        <Pressable onPress={handleSave} className="rounded-xl bg-blue-600 py-3 active:bg-blue-700">
          <Text className="text-center text-lg font-semibold text-white">Siguiente</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
