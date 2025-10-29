import { View, Text, Image, Pressable } from 'react-native';
import Screen from '@/components/Screen';
import { MaterialIcons } from '@expo/vector-icons';
import { useSessionStore } from '@/store/sessionStore';
import { supabase } from '@/config/supabase';
import { useRouter } from 'expo-router';

export default function Account() {
  const router = useRouter();
  const { session, clearSession } = useSessionStore();

  const user = session?.user;
  const metadata = user?.user_metadata || {};

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      clearSession();
      if (error) console.log(error);
      else router.replace('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Screen>
      <View className="flex-1 items-center justify-center bg-white px-6">
        {/* Avatar */}
        <View className="mb-6">
          {metadata?.picture ? (
            <Image
              source={{ uri: metadata.picture }}
              className="h-28 w-28 rounded-full border-4 border-blue-500"
            />
          ) : (
            <View className="h-28 w-28 items-center justify-center rounded-full border-4 border-blue-500 bg-blue-100">
              <MaterialIcons name="person" size={60} color="#3b82f6" />
            </View>
          )}
        </View>

        {/* Nombre */}
        <Text className="mb-2 text-2xl font-semibold text-gray-900">
          {metadata.full_name || 'Usuario sin nombre'}
        </Text>

        {/* Email */}
        <Text className="mb-4 text-gray-500">{user?.email || 'Sin correo electrónico'}</Text>

        {/* Rol */}
        {metadata.role && (
          <View className="mb-4 rounded-full border border-blue-300 bg-blue-100 px-4 py-2">
            <Text className="font-medium text-blue-700">Rol: {metadata.role}</Text>
          </View>
        )}

        {/* Tópicos */}
        {metadata.topics?.length > 0 && (
          <View className="mb-6 items-center">
            <Text className="mb-2 font-medium text-gray-700">Tópicos de interés:</Text>
            <View className="flex-row flex-wrap justify-center">
              {metadata.topics.map((topic: string, index: number) => (
                <View
                  key={index}
                  className="m-1 rounded-full border border-green-300 bg-green-100 px-3 py-1">
                  <Text className="text-sm text-green-700">{topic}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Botones */}
        <View className="mt-4 w-full space-y-3">
          <Pressable
            onPress={() => router.push('/(account)/CompleteProfile')}
            className="rounded-xl bg-blue-500 py-3 active:bg-blue-600">
            <Text className="text-center text-base font-medium text-white">Completar perfil</Text>
          </Pressable>

          <Pressable
            onPress={() => router.push('/(account)/EditProfile')}
            className="rounded-xl bg-blue-500 py-3 active:bg-blue-600">
            <Text className="text-center text-base font-medium text-white">Editar perfil</Text>
          </Pressable>

          <Pressable
            onPress={handleLogout}
            className="rounded-xl bg-red-500 py-3 active:bg-red-600">
            <Text className="text-center text-base font-medium text-white">Cerrar sesión</Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}
