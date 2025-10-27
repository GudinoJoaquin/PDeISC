import { View, Text, Image, Pressable } from 'react-native';
import Screen from '@/components/Screen';
import useAccount from '@/hooks/useAccount';
import { MaterialIcons } from '@expo/vector-icons';
import clearLocalSession from '@/utils/clearLocalSession';
import { useSessionStore } from '@/store/sessionStore';
import axios from 'axios';
import { useRouter } from 'expo-router';

export default function Account() {
  const { account } = useAccount();
  const router = useRouter();
  const { access_token, clearSession } = useSessionStore();
  const user = account?.user_metadata;

  const handleLogout = async () => {
    try {
      await axios.post('http://192.168.1.37:3000/auth/signOut', { access_token });
      await clearLocalSession();
      clearSession();
      router.replace('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Screen>
      <View className="flex-1 items-center justify-center bg-white px-6">
        {/* Avatar */}
        <View className="mb-6">
          {user?.avatar_url ? (
            <Image
              source={{ uri: user.avatar_url }}
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
          {user?.full_name || 'Usuario sin nombre'}
        </Text>

        {/* Email */}
        <Text className="mb-8 text-gray-500">{account?.email || 'Sin correo electrónico'}</Text>

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
