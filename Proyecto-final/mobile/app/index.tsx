import { Text, ScrollView, View, Dimensions, Pressable } from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import type { Class } from '@/interfaces/class';
import Screen from '@/components/Screen';
import ClassCard from '@/components/ClassCard';
import { Config } from '@/enum/config';
import { useRouter } from 'expo-router';

export default function App() {
  const [data, setData] = useState<Class[]>([]);
  const [instituciones, setInstituciones] = useState<any[]>([]);
  const router = useRouter();
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = screenWidth * 0.9; // 👈 cada card ocupa el 80% del ancho
  const cardMargin = 14; // 👈 margen para centrar

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://${Config.IP}:${Config.PORT}/alumno/cursos/get`);
        console.log(response.data);
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // instituciones
    const fetchInstituciones = async () => {
      try {
        const r = await axios.get(`http://${Config.IP}:${Config.PORT}/institucion/list`);
        setInstituciones(r.data.data || []);
      } catch (e) {
        console.log('Error fetching instituciones', e);
      }
    };
    fetchInstituciones();
  }, []);

  return (
    <Screen>
      <ScrollView
        contentContainerClassName="items-center"
        contentContainerStyle={{ paddingBottom: 120 }}>
        <View className="mt-12 w-full">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={cardWidth + 16} // 👈 ancho card + margen entre cards
            decelerationRate="fast"
            contentContainerStyle={{
              paddingHorizontal: cardMargin, // 👈 espacio inicial y final
              alignItems: 'center',
            }}>
            <ClassCard
              titulo="La meho clase"
              descripcion="Esta e la meho clase"
              destacada
              topics={['Matematica', 'Historia']}
            />
            <ClassCard
              titulo="La peho clase"
              descripcion="Esta e la meho clase"
              destacada
              topics={['Matematica', 'Historia']}
            />
            <ClassCard
              titulo="Buenah clase"
              descripcion="Esta e la meho clase"
              destacada
              topics={['Matematica', 'Historia']}
            />
            <ClassCard
              titulo="clase"
              descripcion="Esta e la meho clase"
              destacada
              topics={['Matematica', 'Historia']}
            />
          </ScrollView>
        </View>

        <View className="">
          <Text className="mx-2 mb-4 mt-24 text-3xl font-bold">Instituciones</Text>
          <View className="flex-col gap-4 px-4">
            {instituciones?.map((inst) => (
              <View key={inst.id} className="mb-2">
                <ClassCard
                  titulo={inst.nombre}
                  descripcion={inst.descripcion}
                  topics={inst.topicos || []}
                />
              </View>
            ))}
          </View>

          <Text className="mx-2 mb-4 mt-8 text-3xl font-bold">Cursos</Text>
          <View className="flex-col gap-8">
            {data?.map((curso) => (
              <Pressable
                onPress={() => router.push({ pathname: '/[id]', params: { id: curso.id } })}
                key={curso.id}>
                <ClassCard
                  titulo={curso.titulo}
                  descripcion={curso.descripcion}
                  topics={curso.topicos}
                />
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}
