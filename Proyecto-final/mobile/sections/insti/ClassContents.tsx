import { View, Text, Pressable, Dimensions, ScrollView } from 'react-native';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Config } from '@/enum/config';
import { Link, router } from 'expo-router';

export default function ClassContents({ classId }: { classId: string }) {
  const [data, setData] = useState<any[]>([]); // tareas

  const screenWidth = Dimensions.get('window').width;
  const cardWidth = screenWidth * 0.9;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Para instituciones mostramos las tareas (no los contenidos)
        const response = await axios.get(
          `http://${Config.IP}:${Config.PORT}/institucion/clases/get/${classId}`
        );
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [classId]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  // (no se usa shortenText en la vista de tareas)

  return (
    <View className="mb-24 flex-1 pt-4">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="justify-center items-center"
        contentContainerStyle={{ paddingBottom: 100 }}>
        {data &&
          data.map((task: any) => (
            <Pressable key={String(task.id)}>
              <View
                style={{ width: cardWidth, padding: 12 }}
                className="mx-2 mb-4 mt-4 h-48 flex-col rounded-xl bg-white shadow-md">
                {/* Título y fecha de entrega */}
                <View className="mb-2 flex-row items-center justify-between">
                  <Text className="text-lg font-bold">{task.nombre}</Text>
                  <Text className="text-sm text-gray-400">
                    {formatDate(task.due_date || task.created_at)}
                  </Text>
                </View>

                {/* Descripción */}
                <Text className="mb-4 text-gray-700">{task.descripcion}</Text>

                {/* Archivo/Enlace */}
                <View style={{ width: cardWidth, flexWrap: 'wrap', flexDirection: 'row' }}>
                  {task.bucket_path || task.url_path ? (
                    //@ts-ignore
                    <Link
                      href={task.bucket_path || task.url_path}
                      target="_blank"
                      style={{ marginHorizontal: 4, marginBottom: 4 }}>
                      <View className="flex-row items-center rounded-full bg-gray-200 px-3 py-1">
                        <Text className="text-sm">
                          {(task.bucket_path || task.url_path).split('/').pop()}
                        </Text>
                      </View>
                    </Link>
                  ) : null}
                </View>
              </View>
            </Pressable>
          ))}
      </ScrollView>
    </View>
  );
}
