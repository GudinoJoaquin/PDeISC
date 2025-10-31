import { Text, View } from 'react-native';

export default function Info({ topics }: { topics: string[] }) {
  return (
    <View className="flex-1">
      {topics.length > 0 && (
        <View className="mb-6">
          <Text className="mb-2 font-medium text-gray-700">Tópicos de interés:</Text>
          <View className="flex-row flex-wrap">
            {topics.map((topic, index) => (
              <View
                key={index}
                className="m-1 rounded-full border border-green-300 bg-green-100 px-3 py-1">
                <Text className="text-sm text-green-700">{topic}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}
