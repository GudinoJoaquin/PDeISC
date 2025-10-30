import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Config } from '@/enum/config';
import type { Class } from '@/interfaces/class';
import Screen from '@/components/Screen';
import ClassTabs from '@/components/ClassTabs';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import Header from '@/components/Header';

export default function ClassDetails() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<Class | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://${Config.IP}:${Config.PORT}/profesor/curso/getByID/${id}`
        );
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  if (!data) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center">
          <Text className="text-lg text-gray-500">Cargando clase...</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <Header title='Detalles de la clase'/>
      <ClassTabs data={data} />
    </Screen>
  );
}
