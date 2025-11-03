import { Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function Info({ topics }: { topics: string[] }) {
  const router = useRouter();
  return (
    <View className="flex-1">
      <View className="mb-4">
        <Pressable
          onPress={() => router.push('/(institucion)/RegistrarInstitucion')}
          className="mb-4 rounded-lg bg-blue-600 px-4 py-2">
          <Text className="text-center text-white">Registrar institución</Text>
        </Pressable>
      </View>
      {topics.length > 0 && (
        <View className="mb-6">
          <Text className="mb-2 font-medium text-gray-700">Tópicos de interés:</Text>
          <View className="flex-row flex-wrap">
            {topics.map((topic, index) => (
              <View
                key={index}
                className="m-1 rounded-full border border-green-300 bg-green-100 px-3 py-1">
                <Text className="text-sm text-green-700">{topic}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}
