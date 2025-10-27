import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

export default function Screen({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaView className="flex-1 bg-gray-100 pt-[StatusBar.currentHeight]" edges={['top']}>
      <StatusBar
        barStyle="dark-content" // texto oscuro
        backgroundColor="#f3f4f6" // gris claro igual al fondo
      />
      {children}
    </SafeAreaView>
  );
}
