import { View, Text, Pressable } from 'react-native';
import { useState } from 'react';
import ClassInfo from '@/sections/profesor/ClassInfo';
import ClassContents from '@/sections/profesor/ClassContents';
import type { Class } from '@/interfaces/class';

export default function ClassTabs({ data }: { data: Class }) {
  const [tab, setTab] = useState<'info' | 'contenidos'>('info');

  return (
    <View className="flex-1">
      {/* HEADER FIJO (imagen + título) */}
      <View className="-mt-8 mb-4">
        {/* Imagen o banner azul */}
        <View className="h-48 w-full justify-end bg-blue-500 px-5 pb-5 shadow">
          <Text className="text-2xl font-bold text-white">{data.titulo}</Text>
        </View>

        {/* Pestañas */}
        <View className="flex-row border-b border-gray-200 bg-white">
          <Pressable
            onPress={() => setTab('info')}
            className={`flex-1 py-3 ${
              tab === 'info' ? 'border-b-2 border-blue-500' : 'border-b-2 border-transparent'
            }`}>
            <Text
              className={`text-center font-medium ${
                tab === 'info' ? 'text-blue-600' : 'text-gray-500'
              }`}>
              Información
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setTab('contenidos')}
            className={`flex-1 py-3 ${
              tab === 'contenidos' ? 'border-b-2 border-blue-500' : 'border-b-2 border-transparent'
            }`}>
            <Text
              className={`text-center font-medium ${
                tab === 'contenidos' ? 'text-blue-600' : 'text-gray-500'
              }`}>
              Contenidos
            </Text>
          </Pressable>
        </View>
      </View>

      {/* CONTENIDO CAMBIANTE */}
      <View className="flex-1">
        {tab === 'info' ? <ClassInfo data={data} /> : <ClassContents classId={data.id} />}
      </View>
    </View>
  );
}
