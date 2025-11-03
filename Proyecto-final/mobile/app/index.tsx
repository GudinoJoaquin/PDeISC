import {
  Text,
  ScrollView,
  View,
  Dimensions,
  Pressable,
  StyleSheet,
  ImageBackground,
} from 'react-native';
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
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      }}
      style={{ flex: 1 }}
      imageStyle={{ opacity: 0.18 }}>
      <Screen>
        <ScrollView
          contentContainerClassName="items-center"
          contentContainerStyle={{ paddingBottom: 120 }}
          showsVerticalScrollIndicator={false}>
          {/* DESTACADAS */}
          <View style={{ marginTop: 36, width: '100%' }}>
            <Text style={styles.sectionTitle}>Destacadas</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={cardWidth + 24}
              decelerationRate="fast"
              contentContainerStyle={{
                paddingHorizontal: cardMargin,
                alignItems: 'center',
                gap: 12,
              }}>
              <ClassCard
                titulo="La mejor clase"
                descripcion="Esta es la mejor clase"
                destacada
                topics={['Matemática', 'Historia']}
              />
              <ClassCard
                titulo="Clase creativa"
                descripcion="Aprende de forma divertida"
                destacada
                topics={['Arte', 'Innovación']}
              />
              <ClassCard
                titulo="Clase avanzada"
                descripcion="Para los que quieren más"
                destacada
                topics={['Ciencia', 'Tecnología']}
              />
            </ScrollView>
          </View>

          {/* INSTITUCIONES */}
          <View style={{ marginTop: 36, width: '100%' }}>
            <Text style={styles.sectionTitle}>Instituciones</Text>
            <View style={{ flexDirection: 'column', gap: 16, paddingHorizontal: 16 }}>
              {instituciones?.map((inst) => (
                <View key={inst.id} style={{ marginBottom: 4 }}>
                  <ClassCard
                    titulo={inst.nombre}
                    descripcion={inst.descripcion}
                    topics={inst.topicos || []}
                  />
                </View>
              ))}
            </View>
          </View>

          {/* CURSOS */}
          <View style={{ marginTop: 36, width: '100%' }}>
            <Text style={styles.sectionTitle}>Cursos</Text>
            <View style={{ flexDirection: 'column', gap: 20, paddingHorizontal: 16 }}>
              {data?.map((curso) => (
                <Pressable
                  onPress={() => router.push({ pathname: '/[id]', params: { id: curso.id } })}
                  key={curso.id}
                  style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}>
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a237e',
    marginLeft: 18,
    marginBottom: 10,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0,0,0,0.08)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
