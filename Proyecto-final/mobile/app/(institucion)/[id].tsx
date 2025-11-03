import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Config } from '@/enum/config';
import type { Class } from '@/interfaces/class';
import Screen from '@/components/Screen';
import ClassTabs from '@/components/institucion/ClassTabs';
import { View, Text } from 'react-native';

export default function ClassDetails() {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState<Class | null>(null);

  useEffect(() => {
    setData(null);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://${Config.IP}:${Config.PORT}/institucion/clases/getByID/${id}`
        );
        // Map clase shape to Class interface
        const c = response.data.data;
        setData({
          id: c.id,
          titulo: c.nombre || c.titulo || '',
          descripcion: c.descripcion,
          topicos: c.topicos || [],
          profesor: c.profesor || null,
          alumnos: [],
          created_at: c.created_at || '',
        });
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
      <ClassTabs data={data} />
    </Screen>
  );
}
