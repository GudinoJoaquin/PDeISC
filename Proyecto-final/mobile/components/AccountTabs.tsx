import { View, Text, Pressable } from 'react-native';
import { useState } from 'react';
import ProfesorClases from '@/sections/profesor/Clases';
import AlumnoClases from '@/sections/alumno/Clases';
import ProfesorInfo from '@/sections/profesor/Info';
import AlumnoInfo from '@/sections/alumno/Info';
import Tab from './Tab';

interface AccountTabsProps {
  role?: string;
  topics?: string[];
}

export default function AccountTabs({ role, topics = [] }: AccountTabsProps) {
  const [tab, setTab] = useState<string>('Perfil');

  return (
    <>
      {/* PESTAÑAS */}
      <View className="mb-6 flex-row border-b border-gray-200">
        {role === 'Profesor' ? (
          <>
            <Tab title="Perfil" tab={tab} onPress={() => setTab('Perfil')} />
            <Tab title="Cursos" tab={tab} onPress={() => setTab('Cursos')} />
          </>
        ) : role === 'Estudiante' ? (
          <>
            <Tab title="Perfil" tab={tab} onPress={() => setTab('Perfil')} />
            <Tab title="Cursos" tab={tab} onPress={() => setTab('Cursos')} />
          </>
        ) : (
          <View className="mt-10 flex-1 items-center justify-center">
            <Text className="text-gray-500">Información del perfil</Text>
          </View>
        )}
      </View>

      {/* CONTENIDO SEGÚN TAB */}
      {tab === 'Perfil' ? (
        <>
          {role === 'Profesor' ? (
            <ProfesorInfo topics={topics} />
          ) : role === 'Estudiante' ? (
            <AlumnoInfo topics={topics} />
          ) : (
            <ProfesorInfo topics={topics} />
          )}
        </>
      ) : (
        <View className="flex-1">
          {role === 'Profesor' ? (
            <ProfesorClases />
          ) : role === 'Estudiante' ? (
            <AlumnoClases />
          ) : (
            <ProfesorClases />
          )}
        </View>
      )}
    </>
  );
}
