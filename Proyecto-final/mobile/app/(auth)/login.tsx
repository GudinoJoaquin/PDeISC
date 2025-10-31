import { View, Text, TextInput, Pressable } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons'; // icono de Google
import * as Linking from 'expo-linking';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { supabase } from '@/config/supabase';
import { useSessionStore } from '@/store/sessionStore'; // 👈 importar el store
import { Session } from '@supabase/supabase-js';

export default function Login() {
  const router = useRouter();
  const [userData, setUserData] = useState({ email: '', password: '' });
  const { setSession } = useSessionStore(); // 👈 obtener setter del store

  useEffect(() => {
    const handleDeepLink = async (event: Linking.EventType) => {
      const url = event.url;
      console.log('🔗 URL capturada:', url);

      const hashFragment = url.split('#')[1];
      if (!hashFragment) return;

      const params = Object.fromEntries(new URLSearchParams(hashFragment));
      const access_token = params['access_token'];
      const refresh_token = params['refresh_token'];

      console.log('✅ access_token:', access_token);
      console.log('♻ refresh_token:', refresh_token);

      if (access_token) {
        const { data, error } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });

        if (error) {
          console.error('Error al establecer sesión:', error);
          return;
        }

        console.log('🔓 Sesión establecida:', data.session?.user?.email);

        // ✅ Actualizamos el store global
        setSession(data.session as Session);

        // 🔁 Redirigimos al home
        router.replace('/');
      }
    };

    const subscription = Linking.addEventListener('url', handleDeepLink);

    (async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) handleDeepLink({ url: initialUrl } as Linking.EventType);
    })();

    return () => subscription.remove();
  }, [router, setSession]);

  const handleGoogle = async () => {
    try {
      const redirectTo = 'exp://192.168.1.37:8081';
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo },
      });
      if (error) console.log(error);
      if (data?.url) Linking.openURL(data.url);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGithub = async () => {
    try {
      const redirectTo = 'exp://192.168.1.37:8081';
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: { redirectTo, scopes: 'repo read:user' },
      });
      if (error) console.log(error);
      if (data?.url) Linking.openURL(data.url);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: userData.email,
        password: userData.password,
      });
      if (error) console.log(error);
      console.log(data);
      setSession(data.session as Session);
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 px-6">
      <View className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
        <Text className="mb-6 text-center text-3xl font-bold text-blue-600">Iniciar sesión</Text>

        <Text className="mb-2 text-gray-700">Correo electrónico</Text>
        <TextInput
          placeholder="usuario@ejemplo.com"
          className="mb-4 rounded-xl border border-gray-300 px-4 py-3 text-gray-800"
          keyboardType="email-address"
          onChangeText={(e) => setUserData((prev) => ({ ...prev, email: e }))}
        />

        <Text className="mb-2 text-gray-700">Contraseña</Text>
        <TextInput
          placeholder="••••••••"
          secureTextEntry
          className="mb-6 rounded-xl border border-gray-300 px-4 py-3 text-gray-800"
          onChangeText={(e) => setUserData((prev) => ({ ...prev, password: e }))}
        />

        <Pressable onPress={handleLogin} className="rounded-xl bg-blue-600 py-3">
          <Text className="text-center text-lg font-semibold text-white">Entrar</Text>
        </Pressable>

        <Pressable className="mt-4">
          <Text className="text-center text-blue-600">¿Olvidaste tu contraseña?</Text>
        </Pressable>

        <View className="my-6 flex-row items-center">
          <View className="h-[1px] flex-1 bg-gray-300" />
          <Text className="mx-3 text-sm text-gray-500">o</Text>
          <View className="h-[1px] flex-1 bg-gray-300" />
          <View className="h-[1px] flex-1 bg-gray-300" />
        </View>

        <Pressable
          onPress={handleGoogle}
          className="flex-row items-center justify-center rounded-xl border border-gray-300 py-3 active:bg-gray-50">
          <AntDesign name="google" size={20} color="#DB4437" />
          <Text className="ml-3 text-base font-semibold text-gray-700">
            Iniciar sesión con Google
          </Text>
        </Pressable>
        <Pressable
          onPress={handleGithub}
          className="flex-row items-center justify-center rounded-xl border border-gray-300 py-3 active:bg-gray-50">
          <Entypo name="github" size={24} color="#3298ff" />
          <Text className="ml-3 text-base font-semibold text-gray-700">
            Iniciar sesión con Github
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
