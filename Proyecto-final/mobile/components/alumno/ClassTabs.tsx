import { View, Text, Pressable } from 'react-native';
import { useState } from 'react';
import ClassInfo from '@/sections/alumno/ClassInfo';
import ClassContents from '@/sections/alumno/ClassContents';
import type { Class } from '@/interfaces/class';
import axios from 'axios';
import { Config } from '@/enum/config';
import { useSessionStore } from '@/store/sessionStore';
import { useAlertStore } from '@/store/alertStore';

interface Curso {
  contents: [completed: boolean, content_id: string];
  curso_id: string;
}

export default function ClassTabs({ data }: { data: Class }) {
  const [tab, setTab] = useState<'info' | 'contenidos'>('info');
  const { showAlert } = useAlertStore();
  const { session } = useSessionStore();

  // ✅ Estado local para saber si el usuario ya está inscrito
  const [isJoined, setIsJoined] = useState(
    !!session?.user.user_metadata.cursos?.find((c: string) => c === data.id)
  );

  const handleAdd = async () => {
    try {
      const response = await axios.post(`http://${Config.IP}:${Config.PORT}/alumno/cursos/add`, {
        user_id: session?.user.id,
        class_id: data.id,
      });

      console.log(response.data);
      showAlert('Inscripto correctamente', 'success');
      setIsJoined(true); // ✅ Actualizamos la vista local
    } catch (error) {
      console.log(error);
    }

    try {
      const response = await axios.put(
        `http://${Config.IP}:${Config.PORT}/profesor/curso/addAlumno`,
        { user_id: session?.user.id }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="flex-1">
      {/* HEADER */}
      <View className="-mt-8 mb-4">
        <View className="h-48 w-full justify-end bg-blue-500 px-5 pb-5 shadow">
          <View className="flex-row items-center justify-between">
            <Text className="text-2xl font-bold text-white">{data.titulo}</Text>

            {!isJoined && (
              <Pressable
                onPress={handleAdd}
                className="rounded-full border-2 border-white px-5 py-1">
                <Text className="text-sm font-semibold text-white">Unirme</Text>
              </Pressable>
            )}
          </View>
        </View>

        {/* TABS */}
        <View className="flex-row border-b border-gray-200 bg-white">
          <Pressable
            onPress={() => setTab('info')}
            className={`flex-1 py-3 ${
              tab === 'info' ? 'border-b-2 border-blue-500' : 'border-b-2 border-transparent'
            }`}>
            <Text
              className={`text-center font-medium ${
                tab === 'info' ? 'text-blue-600' : 'text-gray-500'
              }`}>
              Información
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setTab('contenidos')}
            className={`flex-1 py-3 ${
              tab === 'contenidos' ? 'border-b-2 border-blue-500' : 'border-b-2 border-transparent'
            }`}>
            <Text
              className={`text-center font-medium ${
                tab === 'contenidos' ? 'text-blue-600' : 'text-gray-500'
              }`}>
              Contenidos
            </Text>
          </Pressable>
        </View>
      </View>

      {/* CONTENIDO */}
      <View className="flex-1">
        {tab === 'info' ? <ClassInfo data={data} /> : <ClassContents cursoId={data.id} />}
      </View>
    </View>
  );
}
