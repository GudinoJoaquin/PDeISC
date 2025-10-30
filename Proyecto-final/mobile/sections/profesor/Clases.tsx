import { ActivityIndicator, Pressable, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useSessionStore } from '@/store/sessionStore';
import axios from 'axios';
import ClassCard from '@/components/ClassCard';
import { useRouter } from 'expo-router';
import type { Class } from '@/interfaces/class';
import { Config } from '@/enum/config';
import AddButton from '@/components/AddButton';

export default function Clases() {
  const [data, setData] = useState([]);
  const { session } = useSessionStore();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://${Config.IP}:${Config.PORT}/profesor/class/get/${session?.user?.id}`
        );

        console.log(response.data);
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  if (!data) {
    return <ActivityIndicator />;
  }

  return (
    <View className="gap-4">
      <AddButton route={'/(profesor)/CrearClase'} text="Crear clase" />
      {data.map((clase: Class) => (
        <Pressable
          key={clase.id}
          onPress={() => router.push({ pathname: '/(profesor)/[id]', params: { id: clase.id } })}>
          <View className="mb-4 flex-col gap-4">
            <ClassCard
              titulo={clase.titulo}
              descripcion={clase.descripcion}
              topics={clase.topicos}
            />
          </View>
        </Pressable>
      ))}
    </View>
  );
}
