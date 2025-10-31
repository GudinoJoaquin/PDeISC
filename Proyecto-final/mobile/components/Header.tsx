import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const router = useRouter();

  return (
    <View className="h-16 flex-row items-center gap-8 px-4">
      <Pressable onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </Pressable>
      <Text className="text-3xl font-semibold">{title}</Text>
    </View>
  );
}
