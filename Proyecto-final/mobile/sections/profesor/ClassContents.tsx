import AddButton from '@/components/AddButton';
import { View, Text } from 'react-native';

export default function ClassContents({ classId }: { classId: string }) {
  return (
    <View className="flex-1 px-5 pt-4">
      <AddButton text="Subir contenido" route="/(profesor)/SubirContenido" />
      <Text className="text-sm text-gray-400">ID de la clase: {classId}</Text>
    </View>
  );
}
