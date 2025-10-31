import { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import Screen from '@/components/Screen';
import { useSessionStore } from '@/store/sessionStore';
import { supabase } from '@/config/supabase';
import { useRouter } from 'expo-router';

const roles = ['Estudiante', 'Profesor', 'Institucion'];
const topics = ['Tecnología', 'Salud', 'Educación', 'Negocios', 'Arte', 'Ciencia'];

export default function EditProfile() {
  const router = useRouter();
  const { session, refreshSession } = useSessionStore();
  const user = session?.user;

  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || '');
  const [role, setRole] = useState(user?.user_metadata?.role || '');
  const [selectedTopics, setSelectedTopics] = useState<string[]>(user?.user_metadata?.topics || []);
  const [bio, setBio] = useState(user?.user_metadata?.bio || '');
  const [saving, setSaving] = useState(false);

  const toggleTopic = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const updates = {
        full_name: fullName,
        role,
        topics: selectedTopics,
        bio,
      };

      const { error } = await supabase.auth.updateUser({
        data: updates,
      });

      if (error) throw error;

      await refreshSession();

      alert('Perfil actualizado ✅');
      router.back();
    } catch (err) {
      console.log(err);
      alert('Error al guardar los cambios.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Screen>
      <ScrollView className="flex-1  px-6 pt-8">
        <Text className="mb-4 text-2xl font-bold text-gray-900">Completar perfil</Text>

        {/* Nombre completo */}
        <Text className="mb-2 font-medium text-gray-700">Nombre completo</Text>
        <TextInput
          className="mb-4 rounded-lg border border-gray-300 px-3 py-2"
          value={fullName}
          onChangeText={setFullName}
          placeholder="Tu nombre"
        />

        {/* Rol */}
        <Text className="mb-2 font-medium text-gray-700">Rol</Text>
        <View className="mb-4 flex-row flex-wrap">
          {roles.map((r) => (
            <Pressable
              key={r}
              onPress={() => setRole(r)}
              className={`m-1 rounded-full border px-4 py-2 ${
                role === r ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
              }`}>
              <Text className={role === r ? 'text-white' : 'text-gray-700'}>{r}</Text>
            </Pressable>
          ))}
        </View>

        {/* Tópicos */}
        <Text className="mb-2 font-medium text-gray-700">Tópicos de interés</Text>
        <View className="mb-4 flex-row flex-wrap">
          {topics.map((t) => (
            <Pressable
              key={t}
              onPress={() => toggleTopic(t)}
              className={`m-1 rounded-full border px-4 py-2 ${
                selectedTopics.includes(t) ? 'border-green-500 bg-green-500' : 'border-gray-300'
              }`}>
              <Text className={selectedTopics.includes(t) ? 'text-white' : 'text-gray-700'}>
                {t}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Bio */}
        <Text className="mb-2 font-medium text-gray-700">Descripción personal</Text>
        <TextInput
          className="text-top mb-6 h-24 rounded-lg border border-gray-300 px-3 py-2"
          multiline
          value={bio}
          onChangeText={setBio}
          placeholder="Contanos algo sobre vos..."
        />

        {/* Guardar */}
        <Pressable
          onPress={handleSave}
          disabled={saving}
          className={`rounded-xl py-3 ${
            saving ? 'bg-gray-400' : 'bg-blue-500 active:bg-blue-600'
          }`}>
          <Text className="text-center text-base font-medium text-white">
            {saving ? 'Guardando...' : 'Guardar cambios'}
          </Text>
        </Pressable>
      </ScrollView>
    </Screen>
  );
}
