import { View, Text, Pressable } from 'react-native';
import { useState } from 'react';
import ProfesorClases from '@/sections/profesor/Clases';
import AlumnoClases from '@/sections/alumno/Clases';
import ProfesorInfo from '@/sections/profesor/Info';
import AlumnoInfo from '@/sections/alumno/Info';
import InstitucionInfo from '@/sections/institucion/Info';
import InstitucionClases from '@/sections/institucion/Clases';

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
          <>
            <Tab title="Perfil" tab={tab} onPress={() => setTab('Perfil')} />
            <Tab title="Clases" tab={tab} onPress={() => setTab('Cursos')} />
          </>
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
            <InstitucionInfo topics={topics} />
          )}
        </>
      ) : (
        <View className="flex-1">
          {role === 'Profesor' ? (
            <ProfesorClases />
          ) : role === 'Estudiante' ? (
            <AlumnoClases />
          ) : (
            <InstitucionClases />
          )}
        </View>
      )}
    </>
  );
}
