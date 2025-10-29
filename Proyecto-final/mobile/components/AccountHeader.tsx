import { View, Text, Image, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { supabase } from '@/config/supabase';
import { useSessionStore } from '@/store/sessionStore';

export default function AccountHeader() {
  const router = useRouter();
  const { session, clearSession } = useSessionStore();

  const user = session?.user;
  const metadata = user?.user_metadata || {};

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      clearSession();
      if (!error) router.replace('/');
      else console.log(error);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View className="mb-6 w-full">
      {/* Sección superior */}
      <View className="mb-4 flex-row items-center justify-between">
        <View className="flex-row items-center">
          {metadata?.picture ? (
            <Image
              source={{ uri: metadata.picture }}
              className="h-20 w-20 rounded-full border-4 border-blue-500"
            />
          ) : (
            <View className="h-20 w-20 items-center justify-center rounded-full border-4 border-blue-500 bg-blue-100">
              <MaterialIcons name="person" size={40} color="#3b82f6" />
            </View>
          )}
          <View className="ml-4">
            <View className="flex-row items-center">
              <Text className="text-2xl font-semibold text-gray-900">
                {metadata.full_name || 'Usuario sin nombre'}
              </Text>
              <Pressable onPress={() => router.push('/(account)/EditProfile')} className="ml-2">
                <MaterialIcons name="edit" size={22} color="#3b82f6" />
              </Pressable>
            </View>
            <Text className="text-gray-500">{user?.email || 'Sin correo electrónico'}</Text>
            {metadata.role && (
              <Text className="mt-1 text-sm font-medium text-blue-600">Rol: {metadata.role}</Text>
            )}
          </View>
        </View>

        <Pressable onPress={handleLogout}>
          <MaterialIcons name="logout" size={28} color="#ef4444" />
        </Pressable>
      </View>

      {/* Botones */}
      <View className="flex-row justify-between">
        <Pressable
          onPress={() => router.push('/(account)/CompleteProfile')}
          className="mr-2 flex-1 rounded-xl bg-blue-500 py-3 active:bg-blue-600">
          <Text className="text-center text-base font-medium text-white">Completar perfil</Text>
        </Pressable>

        <Pressable
          onPress={() => router.push('/(account)/EditProfile')}
          className="mx-2 flex-1 rounded-xl bg-blue-500 py-3 active:bg-blue-600">
          <Text className="text-center text-base font-medium text-white">Editar perfil</Text>
        </Pressable>

        <Pressable
          onPress={handleLogout}
          className="ml-2 flex-1 rounded-xl bg-red-500 py-3 active:bg-red-600">
          <Text className="text-center text-base font-medium text-white">Cerrar sesión</Text>
        </Pressable>
      </View>
    </View>
  );
}
