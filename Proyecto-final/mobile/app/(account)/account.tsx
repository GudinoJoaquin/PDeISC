import { View, Text, Image, Pressable } from 'react-native';
import Screen from '@/components/Screen';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { useSessionStore } from '@/store/sessionStore';
import { supabase } from '@/config/supabase';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function Account() {
  const router = useRouter();
  const { session, clearSession } = useSessionStore();
  const [tab, setTab] = useState<'perfil' | 'clases'>('perfil');

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
      <View className="flex-1 bg-white px-6 pt-10">
        {/* HEADER */}
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
                <Text className="mt-1 font-medium capitalize text-blue-600">
                  Rol: {metadata.role}
                </Text>
              )}
            </View>
          </View>

          {/* Logout */}
          <Pressable onPress={handleLogout} className="ml-2">
            <MaterialIcons name="logout" size={26} color="#ef4444" />
          </Pressable>
        </View>

        {/* PESTAÑAS */}
        {metadata.role === 'Profesor' ? (
          <>
            <View className="mb-6 flex-row border-b border-gray-200">
              <Pressable
                onPress={() => setTab('perfil')}
                className={`flex-1 py-3 ${
                  tab === 'perfil' ? 'border-b-2 border-blue-500' : 'border-b-2 border-transparent'
                }`}>
                <Text
                  className={`text-center font-medium ${
                    tab === 'perfil' ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                  Perfil
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setTab('clases')}
                className={`flex-1 py-3 ${
                  tab === 'clases' ? 'border-b-2 border-blue-500' : 'border-b-2 border-transparent'
                }`}>
                <Text
                  className={`text-center font-medium ${
                    tab === 'clases' ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                  Mis clases
                </Text>
              </Pressable>
            </View>

            {/* CONTENIDO SEGÚN TAB */}
            {tab === 'perfil' ? (
              <View className="flex-1">
                {metadata.topics?.length > 0 && (
                  <View className="mb-6">
                    <Text className="mb-2 font-medium text-gray-700">Tópicos de interés:</Text>
                    <View className="flex-row flex-wrap">
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
              </View>
            ) : (
              <View className="flex-1 items-center justify-center">
                <Text className="italic text-gray-500">
                  Aquí se mostrarán las clases del profesor.
                </Text>
              </View>
            )}
          </>
        ) : (
          // USUARIO NORMAL
          <View className="mt-10 flex-1 items-center justify-center">
            <Text className="text-gray-500">Información del perfil</Text>
          </View>
        )}
      </View>
    </Screen>
  );
}
