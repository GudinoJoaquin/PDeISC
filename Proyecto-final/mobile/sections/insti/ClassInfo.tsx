import { View, Text } from 'react-native';
import type { Class } from '@/interfaces/class';

export default function ClassInfo({ data }: { data: Class }) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  return (
    <View className="flex-1 px-5 pt-4">
      {/* Fecha */}
      <Text className="mb-4 text-sm text-gray-500">Creada el {formatDate(data.created_at)}</Text>

      {/* Descripción */}
      <Text className="mb-6 text-base text-gray-700">{data.descripcion}</Text>

      {/* Tópicos */}
      <View className="mb-6">
        <Text className="mb-2 text-lg font-semibold text-gray-800">Tópicos</Text>
        {data.topicos && data.topicos.length > 0 ? (
          <View className="flex flex-wrap gap-2">
            {data.topicos.map((topic, index) => (
              <View key={index} className="rounded-full bg-blue-100 px-3 py-1">
                <Text className="font-medium text-blue-600">{topic}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text className="text-gray-500">Sin tópicos asignados.</Text>
        )}
      </View>

      {/* Alumnos */}
      <View className="mb-10">
        <Text className="mb-2 text-lg font-semibold text-gray-800">Alumnos</Text>
        {data.alumnos && data.alumnos.length > 0 ? (
          data.alumnos.map((alumno, index) => (
            <View key={index} className="mb-2 rounded-lg bg-gray-100 px-4 py-2">
              <Text className="text-gray-700">{alumno}</Text>
            </View>
          ))
        ) : (
          <Text className="text-gray-500">No hay alumnos inscriptos.</Text>
        )}
      </View>
    </View>
  );
}
