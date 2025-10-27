import { View, Text, TextInput, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // icono de Google
import * as Linking from 'expo-linking';
import axios from 'axios';
import { useState } from 'react';
import saveSession from '@/utils/saveSession';
import { useRouter } from 'expo-router';
import { useSessionStore } from '@/store/sessionStore';

export default function Login() {
  const [data, setData] = useState({ email: '', password: '' });
  const router = useRouter();
  const { jwt, setSession } = useSessionStore();
  const googleLogin = () => {
    Linking.openURL('http://192.168.1.37:3000/oauth/google');
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.1.37:3000/auth/signIn', {
        email: data.email,
        password: data.password,
      });
      const { token, user_id, access_token } = response.data;
      setSession(token, user_id, access_token);
      saveSession(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (jwt) {
    router.push('/');
  }

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 px-6">
      <View className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
        <Text className="mb-6 text-center text-3xl font-bold text-blue-600">Iniciar sesión</Text>

        <Text className="mb-2 text-gray-700">Correo electrónico</Text>
        <TextInput
          placeholder="usuario@ejemplo.com"
          className="mb-4 rounded-xl border border-gray-300 px-4 py-3 text-gray-800"
          keyboardType="email-address"
          onChangeText={(e) => setData((prev) => ({ ...prev, email: e }))}
        />

        <Text className="mb-2 text-gray-700">Contraseña</Text>
        <TextInput
          placeholder="••••••••"
          secureTextEntry
          className="mb-6 rounded-xl border border-gray-300 px-4 py-3 text-gray-800"
          onChangeText={(e) => setData((prev) => ({ ...prev, password: e }))}
        />

        <Pressable onPress={handleLogin} className="rounded-xl bg-blue-600 py-3">
          <Text className="text-center text-lg font-semibold text-white">Entrar</Text>
        </Pressable>

        <Pressable className="mt-4">
          <Text className="text-center text-blue-600">¿Olvidaste tu contraseña?</Text>
        </Pressable>

        {/* --- Separador --- */}
        <View className="my-6 flex-row items-center">
          <View className="h-[1px] flex-1 bg-gray-300" />
          <Text className="mx-3 text-sm text-gray-500">o</Text>
          <View className="h-[1px] flex-1 bg-gray-300" />
        </View>

        {/* --- Botón de Google --- */}
        <Pressable
          onPress={googleLogin}
          className="flex-row items-center justify-center rounded-xl border border-gray-300 py-3 active:bg-gray-50">
          <AntDesign name="google" size={20} color="#DB4437" />
          <Text className="ml-3 text-base font-semibold text-gray-700">
            Iniciar sesión con Google
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
