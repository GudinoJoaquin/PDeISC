import { View, Text, Image, Pressable } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSessionStore } from '@/store/sessionStore';
import { supabase } from '@/config/supabase';

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
    <View className="mb-4 flex-row items-center justify-between">
      {/* Foto + Nombre + Correo */}
      <View className="flex-1 flex-row items-center">
        {/* Imagen */}
        {metadata?.picture ? (
          <Image
            source={{ uri: metadata.picture }}
            className="h-20 w-20 rounded-full border-2 border-blue-500"
          />
        ) : (
          <View className="h-20 w-20 items-center justify-center rounded-full border-2 border-blue-500 bg-blue-100">
            <MaterialIcons name="person" size={40} color="#3b82f6" />
          </View>
        )}

        {/* Nombre, correo y rol */}
        <View className="ml-4 flex-1">
          <View className="flex-row items-center">
            <Text className="flex-shrink text-xl font-semibold text-gray-900">
              {metadata.full_name || 'Usuario sin nombre'}
            </Text>
            <Pressable onPress={() => router.push('/(account)/EditProfile')} className="ml-2">
              <Feather name="edit-2" size={18} color="#3b82f6" />
            </Pressable>
          </View>

          <Text className="text-gray-500">{user?.email || 'Sin correo electrónico'}</Text>

          {metadata.role && (
            <Text className="mt-1 font-medium capitalize text-blue-600">Rol: {metadata.role}</Text>
          )}
        </View>
      </View>

      {/* Logout */}
      <Pressable onPress={handleLogout} className="ml-2">
        <MaterialIcons name="logout" size={26} color="#ef4444" />
      </Pressable>
    </View>
  );
}
