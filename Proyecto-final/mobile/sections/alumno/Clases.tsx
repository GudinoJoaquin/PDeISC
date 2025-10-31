import { ActivityIndicator, Pressable, ScrollView, View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { useSessionStore } from '@/store/sessionStore';
import axios from 'axios';
import ClassCard from '@/components/ClassCard';
import { useRouter } from 'expo-router';
import type { Class } from '@/interfaces/class';
import { Config } from '@/enum/config';

export default function Clases() {
  const [data, setData] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const { session } = useSessionStore();
  const router = useRouter();

  useEffect(() => {
    const fetchAllCursos = async () => {
      try {
        const cursosGuardados = session?.user.user_metadata?.cursos || [];
        console.log('Clases guardadas: ', cursosGuardados);

        if (cursosGuardados.length === 0) {
          setData([]);
          setLoading(false);
          return;
        }

        const cursosData: Class[] = [];

        // Hacer requests secuencialmente
        for (const cursoId of cursosGuardados) {
          try {
            const response = await axios.get(
              `http://${Config.IP}:${Config.PORT}/alumno/cursos/getCursosByID/${cursoId}`
            );
            console.log(`Curso ${cursoId}:`, response.data);
            cursosData.push(response.data.data);
          } catch (error) {
            console.error(`Error fetching curso ${cursoId}:`, error);
            // Continuar con el siguiente curso aunque este falle
          }
        }

        setData(cursosData);
        
      } catch (error) {
        console.error('Error general:', error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCursos();
  }, [session]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (data.length === 0) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-500">No tienes cursos guardados</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: 150,
        }}>
        <View className="w-full items-center">
          {data.map((clase: Class) => (
            <Pressable
              key={clase.id}
              onPress={() => router.push({ pathname: '/[id]', params: { id: clase.id } })}>
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