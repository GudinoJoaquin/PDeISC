import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

export default function AccountTabs({ role }: { role: string }) {
  const [activeTab, setActiveTab] = useState('perfil');

  const renderContent = () => {
    if (role === 'profesor') {
      if (activeTab === 'perfil') return <Text>📄 Información de perfil del profesor.</Text>;
      if (activeTab === 'clases') return <Text>📚 Lista de clases del profesor.</Text>;
    } else {
      return <Text>👤 Información general del usuario.</Text>;
    }
  };

  return (
    <View className="mt-4 w-full">
      {/* Tabs */}
      {role === 'profesor' ? (
        <View className="mb-4 flex-row">
          <Pressable
            onPress={() => setActiveTab('perfil')}
            className={`flex-1 rounded-t-xl border-b-2 py-3 ${
              activeTab === 'perfil' ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-gray-100'
            }`}>
            <Text
              className={`text-center font-medium ${
                activeTab === 'perfil' ? 'text-blue-700' : 'text-gray-500'
              }`}>
              Perfil
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveTab('clases')}
            className={`flex-1 rounded-t-xl border-b-2 py-3 ${
              activeTab === 'clases' ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-gray-100'
            }`}>
            <Text
              className={`text-center font-medium ${
                activeTab === 'clases' ? 'text-blue-700' : 'text-gray-500'
              }`}>
              Mis clases
            </Text>
          </Pressable>
        </View>
      ) : (
        <View className="mb-4 rounded-t-xl border-b-2 border-blue-500 bg-blue-100 py-3">
          <Text className="text-center font-medium text-blue-700">Perfil</Text>
        </View>
      )}

      {/* Contenido */}
      <View className="rounded-b-xl border border-gray-200 bg-gray-50 p-4">{renderContent()}</View>
    </View>
  );
}
