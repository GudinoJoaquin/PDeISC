import { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRegisterStore } from '@/store/registerStore';
import { router } from 'expo-router';

export default function SelectTopics() {
  const { name, type, surname, setTopics } = useRegisterStore();
  const topics = [
    'Matemática',
    'Ciencias',
    'Historia',
    'Lengua',
    'Programación',
    'Arte',
    'Música',
    'Deportes',
    'Física',
    'Química',
  ];

  const [selected, setSelected] = useState<string[]>([]);

  const toggleTopic = (topic: string) => {
    setSelected((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleContinue = () => {
    console.log('Tópicos seleccionados:', selected);
    setTopics(selected);
    console.log(name, surname, type);
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 px-6">
      <View className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
        <Text className="mb-6 text-center text-3xl font-bold text-blue-600">Elegí tus tópicos</Text>

        <ScrollView className=" mb-4 max-h-80" style={{ gap: 12 }}>
          {topics.map((topic) => {
            const isSelected = selected.includes(topic);
            return (
              <Pressable
                key={topic}
                onPress={() => toggleTopic(topic)}
                className={`mb-3 rounded-xl border px-4 py-3 ${
                  isSelected ? 'border-2 border-blue-400 bg-blue-300' : 'border-gray-300 bg-white'
                } transition active:bg-blue-700`}>
                <Text
                  className={`text-center text-lg font-medium ${
                    isSelected ? 'text-white' : 'text-gray-800'
                  }`}>
                  {topic}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <Pressable
          onPress={handleContinue}
          className="rounded-xl bg-blue-600 py-3 active:bg-blue-700">
          <Text className="text-center text-lg font-semibold text-white">Continuar</Text>
        </Pressable>
      </View>
    </View>
  );
}
