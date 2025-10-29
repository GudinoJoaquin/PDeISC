import { View, Text, Pressable } from 'react-native';
import { useState } from 'react';
import Clases from '@/sections/profesor/Clases';

interface AccountTabsProps {
  role?: string;
  topics?: string[];
}

export default function AccountTabs({ role, topics = [] }: AccountTabsProps) {
  const [tab, setTab] = useState<'perfil' | 'clases'>('perfil');

  if (role !== 'Profesor') {
    return (
      <View className="mt-10 flex-1 items-center justify-center">
        <Text className="text-gray-500">Información del perfil</Text>
      </View>
    );
  }

  return (
    <>
      {/* PESTAÑAS */}
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
      ) : (
        <View className="items-center justify-center">
          <Clases />
        </View>
      )}
    </>
  );
}
