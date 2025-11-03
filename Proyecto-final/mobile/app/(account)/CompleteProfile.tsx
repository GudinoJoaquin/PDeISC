import { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Alert } from 'react-native';
import Screen from '@/components/Screen';
import { useSessionStore } from '@/store/sessionStore';
import { supabase } from '@/config/supabase';
import { useRouter } from 'expo-router';

const roles = ['Estudiante', 'Profesor', 'Institucion'];
const topics = ['Tecnología', 'Salud', 'Educación', 'Negocios', 'Arte', 'Ciencia'];

export default function CompleteProfile() {
  const router = useRouter();
  const { session, refreshSession } = useSessionStore();
  const user = session?.user;

  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || '');
  const [role, setRole] = useState(user?.user_metadata?.role || '');
  const [selectedTopics, setSelectedTopics] = useState<string[]>(user?.user_metadata?.topics || []);
  const [bio, setBio] = useState(user?.user_metadata?.bio || '');
  const [saving, setSaving] = useState(false);

  // 🚀 Si el usuario ya completó el perfil, redirigimos
  useEffect(() => {
    if (user?.user_metadata?.role && user?.user_metadata?.topics?.length > 0) {
      router.replace('/'); // ajustá esta ruta según tu app
    }
  }, [user]);

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleSave = async () => {
    if (!role) {
      Alert.alert('Selecciona un rol', 'Debes elegir un rol antes de continuar.');
      return;
    }

    if (selectedTopics.length === 0) {
      Alert.alert('Selecciona tus intereses', 'Elige al menos un tópico de interés.');
      return;
    }

    try {
      setSaving(true);

      const updates = {
        full_name: fullName,
        role,
        topics: selectedTopics,
        bio,
        profile_completed: true, // 👈 bandera para saber si ya terminó la configuración
      };

      const { error } = await supabase.auth.updateUser({ data: updates });
      if (error) throw error;

      await refreshSession();

      Alert.alert('Listo 🎉', 'Tu cuenta fue configurada correctamente.');
      router.replace('/'); // o la pantalla principal
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'No se pudo guardar la información.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Screen>
      <ScrollView className="flex-1 bg-white px-6 pt-10">
        {/* Título */}
        <Text className="mb-2 text-3xl font-bold text-gray-900">
          ¡Bienvenido{fullName ? `, ${fullName.split(' ')[0]}` : ''}! 👋
        </Text>
        <Text className="mb-6 text-gray-600">
          Configurá tu cuenta para personalizar tu experiencia en la app.
        </Text>

        {/* Nombre completo */}
        <Text className="mb-2 font-medium text-gray-700">Nombre completo</Text>
        <TextInput
          className="mb-4 rounded-lg border border-gray-300 px-3 py-2"
          value={fullName}
          onChangeText={setFullName}
          placeholder="Tu nombre"
        />

        {/* Rol */}
        <Text className="mb-2 font-medium text-gray-700">Seleccioná tu rol</Text>
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
        <Text className="mb-2 font-medium text-gray-700">Elegí tus tópicos de interés</Text>
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
        <Text className="mb-2 font-medium text-gray-700">Contanos sobre vos</Text>
        <TextInput
          className="text-top mb-8 h-24 rounded-lg border border-gray-300 px-3 py-2"
          multiline
          value={bio}
          onChangeText={setBio}
          placeholder="Por ejemplo: Soy profesor apasionado por la tecnología..."
        />

        {/* Botón Guardar */}
        <Pressable
          onPress={handleSave}
          disabled={saving}
          className={`rounded-xl py-3 ${
            saving ? 'bg-gray-400' : 'bg-blue-500 active:bg-blue-600'
          }`}>
          <Text className="text-center text-base font-medium text-white">
            {saving ? 'Guardando...' : 'Finalizar configuración'}
          </Text>
        </Pressable>
      </ScrollView>
    </Screen>
  );
}
