import { AntDesign } from '@expo/vector-icons';
import { Dimensions, Pressable, Text, View } from 'react-native';
import type { RelativePathString } from 'expo-router';
import { useRouter } from 'expo-router';

interface AddButtonProps {
  route: string;
  text: string;
}

export default function AddButton({ route, text }: AddButtonProps) {
  const router = useRouter();

  const screenWidth = Dimensions.get('window').width;
  const cardWidth = screenWidth * 0.9; // 👈 cada card ocupa el 80% del ancho

  return (
    <Pressable onPress={() => router.push(route as RelativePathString)}>
      <View
        style={{ width: cardWidth, borderStyle: 'dashed' }}
        className="mx-2 mb-4 mt-4 h-48 flex-col items-center justify-center rounded-xl border-2 border-gray-400 bg-gray-200">
        <AntDesign name="appstore-add" size={48} color="#99a1af" />
        <Text className="font-bold" style={{ color: '#99a1af' }}>
          {text}
        </Text>
      </View>
    </Pressable>
  );
}
