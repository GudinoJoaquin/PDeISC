import { Dimensions, Text, View } from 'react-native';

interface ClassCardProps {
  titulo: string;
  descripcion: string;
  topics: string[];
  destacada?: boolean;
}

export default function ClassCard({
  titulo,
  descripcion,
  topics,
  destacada = false,
}: ClassCardProps) {
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = screenWidth * 0.9; // 👈 cada card ocupa el 80% del ancho
  return (
    <View
      style={{ width: cardWidth }}
      className="mx-2 mt-4 h-48 flex-col items-start justify-center rounded-xl">
      <View className="h-1/2 w-full rounded-t-xl bg-blue-500" />
      <View className="min-h-1/2 w-full rounded-b-xl bg-white p-2 px-3">
        <Text className="text-lg font-semibold text-black">{titulo}</Text>
        {!destacada && <Text>{descripcion}</Text>}
        <View className="mt-2 flex-row gap-2">
          {topics.map((t, i) => (
            <Text key={i} className="rounded-full bg-slate-200 px-3 py-1 text-sm">
              {t}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
}
