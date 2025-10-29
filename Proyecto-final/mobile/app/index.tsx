import { Text, ScrollView, View, Dimensions } from 'react-native';

import Screen from '@/components/Screen';
import ClassCard from '@/components/ClassCard';

export default function App() {
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = screenWidth * 0.9; // 👈 cada card ocupa el 80% del ancho
  const cardMargin = 14; // 👈 margen para centrar

  return (
    <Screen>
      <ScrollView contentContainerClassName="items-center">
        <View className="mt-12 w-full">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={cardWidth + 16} // 👈 ancho card + margen entre cards
            decelerationRate="fast"
            contentContainerStyle={{
              paddingHorizontal: cardMargin, // 👈 espacio inicial y final
              alignItems: 'center',
            }}>
            <ClassCard
              titulo="La meho clase"
              descripcion="Esta e la meho clase"
              destacada
              topics={['Matematica', 'Historia']}
            />
            <ClassCard
              titulo="La peho clase"
              descripcion="Esta e la meho clase"
              destacada
              topics={['Matematica', 'Historia']}
            />
            <ClassCard
              titulo="Buenah clase"
              descripcion="Esta e la meho clase"
              destacada
              topics={['Matematica', 'Historia']}
            />
            <ClassCard
              titulo="clase"
              descripcion="Esta e la meho clase"
              destacada
              topics={['Matematica', 'Historia']}
            />
          </ScrollView>
        </View>

        <View className="">
          <Text className="mx-2 mb-4 mt-24 text-3xl font-bold">Matematiha</Text>
          <View className="flex-col gap-16">
            <View
              style={{ width: cardWidth }}
              className="mx-2 mt-4 h-48 flex-col items-start justify-center rounded-xl">
              <View className="h-1/2 w-full rounded-t-xl bg-blue-500" />
              <View className="min-h-1/2 w-full rounded-b-xl bg-white p-2 px-3">
                <Text className="text-lg font-semibold text-black">Clase de matematica</Text>
                <Text>Clase de matematica pa que aprendah alho pedazo</Text>
                <View className="mt-2 flex-row gap-2">
                  <Text className="rounded-full bg-slate-200 px-3 py-1 text-sm">Mateatica</Text>
                </View>
              </View>
            </View>
            <View
              style={{ width: cardWidth }}
              className="mx-2 mt-4 h-48 flex-col items-start justify-center rounded-xl">
              <View className="h-1/2 w-full rounded-t-xl bg-blue-500" />
              <View className="min-h-1/2 w-full rounded-b-xl bg-white p-2 px-3">
                <Text className="text-lg font-semibold text-black">Clase de matematica</Text>
                <Text>Clase de matematica pa que aprendah alho pedazo</Text>
                <View className="mt-2 flex-row gap-2">
                  <Text className="rounded-full bg-slate-200 px-3 py-1 text-sm">Mateatica</Text>
                </View>
              </View>
            </View>
            <View
              style={{ width: cardWidth }}
              className="mx-2 mt-4 h-48 flex-col items-start justify-center rounded-xl">
              <View className="h-1/2 w-full rounded-t-xl bg-blue-500" />
              <View className="min-h-1/2 w-full rounded-b-xl bg-white p-2 px-3">
                <Text className="text-lg font-semibold text-black">Clase de matematica</Text>
                <Text>Clase de matematica pa que aprendah alho pedazo</Text>
                <View className="mt-2 flex-row gap-2">
                  <Text className="rounded-full bg-slate-200 px-3 py-1 text-sm">Mateatica</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}
