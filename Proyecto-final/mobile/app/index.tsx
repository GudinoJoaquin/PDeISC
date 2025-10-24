import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function App() {
  const router = useRouter();
  return (
    <View>
      <Text>Hola</Text>
      <Pressable onPress={() => router.push('/login')}>
        <Text>Presioname</Text>
      </Pressable>
    </View>
  );
}
