import { AntDesign, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { View, Text, Pressable, Dimensions, ScrollView } from 'react-native';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Config } from '@/enum/config';
import type { Content } from '@/interfaces/class';
import { Link } from 'expo-router';

export default function ClassContents({ cursoId }: { cursoId: string }) {
  const [data, setData] = useState<Content[]>([]);

  const screenWidth = Dimensions.get('window').width;
  const cardWidth = screenWidth * 0.9;

  // Traer los contenidos del curso
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://${Config.IP}:${Config.PORT}/alumno/cursos/contents/get/${cursoId}`
      );
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  const shortenText = (text: string, maxLength: number = 30) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  const renderChip = (content: Content) => {
    const isBucket = !!content.bucket_path;
    const url = isBucket ? content.bucket_path : content.url_path.toLowerCase();

    let text = url;
    if (isBucket) {
      const parts = url.split('uploads/');
      text = parts.length > 1 ? parts[1] : url.split('/').pop() || url;
    }
    text = shortenText(text, 30);

    let icon = null;
    if (isBucket) {
      const ext = text.split('.').pop()?.toLowerCase();
      if (ext === 'pdf') icon = <FontAwesome5 name="file-pdf" size={16} color="#E74C3C" />;
      else if (['jpg', 'jpeg', 'png', 'gif'].includes(ext || ''))
        icon = <MaterialCommunityIcons name="file-image" size={16} color="#3498DB" />;
      else icon = <AntDesign name="file" size={16} color="#95A5A6" />;
    }

    return (
      //@ts-ignore
      <Link href={url} target="_blank" style={{ marginHorizontal: 4, marginBottom: 4 }}>
        <View
          className="flex-row items-center rounded-full bg-gray-200 px-3 py-1"
          style={{ alignSelf: 'flex-start' }}>
          {icon && <View className="mr-1">{icon}</View>}
          <Text className="text-sm">{text}</Text>
        </View>
      </Link>
    );
  };

  return (
    <View className="mb-24 flex-1 pt-4">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="justify-center items-center"
        contentContainerStyle={{ paddingBottom: 100 }}>
        {data.map((content) => (
          <Pressable key={content.id}>
            <View
              style={{ width: cardWidth, padding: 12 }}
              className="mx-2 mb-4 mt-4 h-48 flex-col rounded-xl bg-white shadow-md">
              {/* Título, fecha y checkbox */}
              <View className="mb-2 flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Text className="text-lg font-bold">{content.titulo}</Text>
                 
                </View>
                <Text className="text-sm text-gray-400">{formatDate(content.created_at)}</Text>
              </View>

              {/* Mensaje */}
              <Text className="mb-4 text-gray-700">{content.mensaje}</Text>

              {/* Chip con link */}
              <View style={{ width: cardWidth, flexWrap: 'wrap', flexDirection: 'row' }}>
                {renderChip(content)}
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}