import { View, Text, Pressable } from 'react-native';
import { useRegisterStore } from '@/store/registerStore';
import { useRouter } from 'expo-router';

export default function Registro() {
  const { setType } = useRegisterStore();
  const router = useRouter();
  const handleSelect = (type: 'alumno' | 'profesor' | 'institucion') => {
    console.log(`Registrarse como ${type}`);
    setType(type);
    router.push('/(auth)/(steps)/personal');
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 px-6">
      <View className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
        <Text className="mb-6 text-center text-3xl font-bold text-blue-600">
          ¿Cómo querés registrarte?
        </Text>

        <Pressable
          onPress={() => handleSelect('alumno')}
          className="mb-4 rounded-xl bg-blue-600 py-3 active:bg-blue-700">
          <Text className="text-center text-lg font-semibold text-white">Estudiante</Text>
        </Pressable>

        <Pressable
          onPress={() => handleSelect('profesor')}
          className="mb-4 rounded-xl bg-blue-600 py-3 active:bg-green-700">
          <Text className="text-center text-lg font-semibold text-white">Profesor</Text>
        </Pressable>

        <Pressable
          onPress={() => handleSelect('institucion')}
          className="rounded-xl bg-blue-600 py-3 active:bg-purple-700">
          <Text className="text-center text-lg font-semibold text-white">Institución</Text>
        </Pressable>
      </View>
    </View>
  );
}
