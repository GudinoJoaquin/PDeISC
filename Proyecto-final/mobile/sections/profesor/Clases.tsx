import { ActivityIndicator, Dimensions, Pressable, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useSessionStore } from '@/store/sessionStore';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
import ClassCard from '@/components/ClassCard';
import { useRouter } from 'expo-router';
import type { Class } from '@/interfaces/class';
import { Config } from '@/app/enum/config';

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

  const screenWidth = Dimensions.get('window').width;
  const cardWidth = screenWidth * 0.9; // 👈 cada card ocupa el 80% del ancho

  return (
    <View className="gap-4">
      <Pressable onPress={() => router.push('/(profesor)/CrearClase')}>
        <View
          style={{ width: cardWidth, borderStyle: 'dashed' }}
          className="mx-2 mb-4 mt-4 h-48 flex-col items-center justify-center rounded-xl border-2 border-gray-400 bg-gray-200">
          <AntDesign name="appstore-add" size={48} color="#99a1af" />
          <Text className="font-bold" style={{ color: '#99a1af' }}>
            Crear clase
          </Text>
        </View>
      </Pressable>
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
