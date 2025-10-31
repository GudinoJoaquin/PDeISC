import { ActivityIndicator, Pressable, ScrollView, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useSessionStore } from '@/store/sessionStore';
import axios from 'axios';
import ClassCard from '@/components/ClassCard';
import { useRouter } from 'expo-router';
import type { Class } from '@/interfaces/class';
import { Config } from '@/enum/config';
import AddButton from '@/components/AddButton';
export default function Clases() {
  const [data, setData] = useState<Class[]>([]);
  const { session } = useSessionStore();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://${Config.IP}:${Config.PORT}/profesor/curso/get/${session?.user?.id}`
        );
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  if (!data) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: 150, // espacio para tabBar flotante
        }}>
        <AddButton route={'/(profesor)/CrearClase'} text="Crear clase" />

        <View className="w-full items-center">
          {data.map((clase: Class) => (
            <Pressable
              key={clase.id}
              onPress={() =>
                router.push({ pathname: '/(profesor)/[id]', params: { id: clase.id } })
              }>
              <View className="mb-4 w-11/12">
                <ClassCard
                  titulo={clase.titulo}
                  descripcion={clase.descripcion}
                  topics={clase.topicos}
                />
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
