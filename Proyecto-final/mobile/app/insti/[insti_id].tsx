import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Config } from '@/enum/config';
import type { Class } from '@/interfaces/class';
import Screen from '@/components/Screen';
import ClassTabs from '@/components/insti/ClassTabs';
import { View, Text } from 'react-native';

export default function ClassDetails() {
  const { insti_id } = useLocalSearchParams();
  const [data, setData] = useState<Class | null>(null);

  useEffect(() => {
    setData(null);
    console.log(insti_id);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://${Config.IP}:${Config.PORT}/institucion/institucion/get/${insti_id}`
        );
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [insti_id]);

  if (!data) {
    return (
      <Screen>
        <View className="flex-1 items-center justify-center">
          <Text className="text-lg text-gray-500">Cargando institucion...</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <ClassTabs data={data} />
    </Screen>
  );
}
