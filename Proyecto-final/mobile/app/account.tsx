import { View, Text, Image, Pressable } from 'react-native';
import Screen from '@/components/Screen';
import { MaterialIcons } from '@expo/vector-icons';
import { useSessionStore } from '@/store/sessionStore';
import { supabase } from '@/config/supabase';
import { useRouter } from 'expo-router';

export default function Account() {
  const router = useRouter();
  const { session, clearSession } = useSessionStore();

  const handleLogout = async () => {
    try {
      console.log(session);
      const { error } = await supabase.auth.signOut();
      clearSession();
      if (error) {
        console.log(error);
      } else {
        console.log('Cerrao');
        router.replace('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Screen>
      <View className="flex-1 items-center justify-center bg-white px-6">
        {/* Avatar */}
        <View className="mb-6">
          {session?.user?.raw_user_meta_data?.picture ? (
            <Image
              source={{ uri: session.user?.avatar_url }}
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
          {session?.user?.full_name || 'Usuario sin nombre'}
        </Text>

        {/* Email */}
        <Text className="mb-8 text-gray-500">
          {session?.user?.email || 'Sin correo electrónico'}
        </Text>

        {/* Botones */}
        <View className="mt-4 w-full space-y-3">
          <Pressable className="rounded-xl bg-blue-500 py-3 active:bg-blue-600">
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
