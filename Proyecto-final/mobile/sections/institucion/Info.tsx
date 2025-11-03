import { Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSessionStore } from '@/store/sessionStore';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Config } from '@/enum/config';

export default function Info({ topics }: { topics: string[] }) {
  const router = useRouter();
  const { session } = useSessionStore();
  const [hasInstitution, setHasInstitution] = useState<boolean | null>(null);
  const [institution, setInstitution] = useState<any | null>(null);

  useEffect(() => {
    const checkInstitution = async () => {
      if (!session?.user?.id) {
        setHasInstitution(null);
        setInstitution(null);
        return;
      }

      try {
        const res = await axios.get(
          `http://${Config.IP}:${Config.PORT}/institucion/owner/${session.user.id}`
        );
        if (res?.data?.data) {
          setInstitution(res.data.data);
          setHasInstitution(true);
        } else {
          setInstitution(null);
          setHasInstitution(false);
        }
      } catch {
        // 404 when not found -> no institution
        setInstitution(null);
        setHasInstitution(false);
      }
    };

    checkInstitution();
  }, [session?.user?.id]);

  return (
    <View className="flex-1">
      <View className="mb-4">
        {hasInstitution === false && session?.user?.id && (
          <Pressable
            onPress={() => router.push('/(institucion)/RegistrarInstitucion')}
            className="mb-4 rounded-lg bg-blue-600 px-4 py-2">
            <Text className="text-center text-white">Registrar institución</Text>
          </Pressable>
        )}
      </View>

      {institution && (
        <View className="mb-6 rounded-lg bg-white p-4 shadow">
          <Text className="text-xl font-semibold text-gray-800">{institution.nombre}</Text>
          <Text className="mt-2 text-gray-600">{institution.descripcion}</Text>

          {institution.topicos && institution.topicos.length > 0 && (
            <View className="mt-3 flex-row flex-wrap">
              {institution.topicos.map((t: string, i: number) => (
                <View
                  key={i}
                  className="m-1 rounded-full border border-green-300 bg-green-100 px-3 py-1">
                  <Text className="text-sm text-green-700">{t}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      )}

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
