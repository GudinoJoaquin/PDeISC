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
        // First get the institution for this user (encargado)
        const instRes = await axios.get(
          `http://${Config.IP}:${Config.PORT}/institucion/owner/${session?.user?.id}`
        );
        const institucion = instRes?.data?.data;
        if (!institucion?.id) {
          setData([]);
          return;
        }

        const response = await axios.get(
          `http://${Config.IP}:${Config.PORT}/institucion/clases/get/${institucion.id}`
        );
        // map 'clases' shape to Class interface used by UI
        const clases = (response.data.data || []).map((c: any) => ({
          id: c.id,
          titulo: c.nombre || c.titulo || '',
          descripcion: c.descripcion,
          topicos: c.topicos || [],
          profesor: c.profesor || null,
          alumnos: [],
          created_at: c.created_at || '',
        }));
        setData(clases);
      } catch (error) {
        console.log(error);
        setData([]);
      }
    };
    fetchData();
  }, [session?.user?.id]);

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
        <AddButton route={'/(institucion)/CrearClase'} text="Crear clase" />

        <View className="w-full items-center">
          {data.map((clase: Class) => (
            <Pressable
              key={clase.id}
              onPress={() =>
                router.push({ pathname: '/(institucion)/[id]', params: { id: clase.id } })
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
