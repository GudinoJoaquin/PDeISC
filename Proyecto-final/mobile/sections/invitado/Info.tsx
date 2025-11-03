import { Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSessionStore } from '@/store/sessionStore';

export default function Info({ topics }: { topics: string[] }) {
  const router = useRouter();
  const { session } = useSessionStore();

  const metadata = session?.user?.user_metadata || {};
  const profileCompleted = metadata?.profile_completed || false;

  const openCompleteProfile = () => {
    // Abre la pantalla donde se completa el perfil (ya maneja el guardado y redirección)
    router.push('/(account)/CompleteProfile');
  };

  return (
    <View className="flex-1">
      {/* Si ya hay tópicos, los mostramos */}
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

      {/* Si el perfil no está completado, invitamos a completar */}
      {!profileCompleted && (
        <View className="px-4">
          <Text className="mb-2 text-lg font-semibold text-gray-900">Completá tu perfil</Text>
          <Text className="mb-4 text-gray-600">
            Para aprovechar todas las funciones elegí un nombre, rol y tus tópicos de interés.
          </Text>

          <Pressable onPress={openCompleteProfile} className="rounded-xl bg-blue-500 px-4 py-3">
            <Text className="text-center text-base font-medium text-white">Completar perfil</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
