import { View, Text, TextInput, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAlertStore } from '@/store/alertStore';
import { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import Alert from '@/components/Alert';
import axios from 'axios';
import { Config } from '@/enum/config';

export default function SubirContenido() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { showAlert } = useAlertStore();

  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tipo, setTipo] = useState<'link' | 'file' | ''>('');
  const [link, setLink] = useState('');
  const [archivo, setArchivo] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
      if (!result) return;

      //@ts-ignore
      const file = result.assets[0];
      setArchivo(file);
    } catch (err) {
      console.error('Error al seleccionar archivo:', err);
      showAlert('Error al seleccionar el archivo.', 'error');
    }
  };

  const handleSelect = (value: 'link' | 'file') => {
    setTipo(value);
    setDropdownOpen(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('claseId', id as string);
      formData.append('titulo', titulo);
      formData.append('mensaje', descripcion);
      formData.append('tipo', tipo);

      if (tipo === 'link') formData.append('link', link.toLowerCase());

      if (archivo) {
        // @ts-ignore
        formData.append('archivo', {
          uri: archivo.uri,
          name: archivo.name,
          type: archivo.mimeType || 'application/octet-stream',
        });
      }

      const res = await axios.put(
        `http://${Config.IP}:${Config.PORT}/profesor/curso/update`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      if (res.data) {
        showAlert('Clase actualizada correctamente ✅', 'success');
        console.log('Respuesta backend:', res.data);
        router.back();
      } else {
        showAlert('Error al actualizar la clase', 'error');
        console.error('Error backend:', res.data);
      }
    } catch (err) {
      console.error('Error al enviar datos al backend:', err);
      showAlert('Error al enviar datos al backend', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="mt-12 items-center justify-center bg-gray-100 px-6">
      <Alert />

      <View className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
        <Text className="mb-6 text-center text-3xl font-bold text-blue-600">Subir contenido</Text>

        {/* Título */}
        <Text className="mb-2 text-gray-700">Título</Text>
        <TextInput
          placeholder="La mejor clase"
          className="mb-4 rounded-xl border border-gray-300 px-4 py-3 text-gray-800"
          value={titulo}
          onChangeText={setTitulo}
        />

        {/* Descripción */}
        <Text className="mb-2 text-gray-700">Mensaje</Text>
        <TextInput
          className="text-top mb-8 h-24 rounded-lg border border-gray-300 px-3 py-2"
          multiline
          placeholder="Esta es la mejor clase"
          value={descripcion}
          onChangeText={setDescripcion}
        />

        {/* Selector de tipo */}
        <Text className="mb-2 font-medium text-gray-700">Tipo de contenido</Text>
        <View className="relative mb-4">
          <Pressable
            onPress={() => setDropdownOpen(!dropdownOpen)}
            className="flex-row items-center justify-between rounded-xl border border-gray-300 bg-gray-50 px-4 py-3">
            <Text className="text-gray-800">
              {tipo === '' ? 'Seleccioná una opción...' : tipo === 'link' ? 'Enlace' : 'Archivo'}
            </Text>
            <Text className="text-gray-500">{dropdownOpen ? '▲' : '▼'}</Text>
          </Pressable>

          {dropdownOpen && (
            <View className="absolute left-0 right-0 top-[110%] z-10 rounded-xl border border-gray-300 bg-white shadow-lg">
              <Pressable
                onPress={() => handleSelect('link')}
                className={`px-4 py-3 ${tipo === 'link' ? 'bg-blue-50' : ''}`}>
                <Text className="text-gray-800">Enlace</Text>
              </Pressable>
              <Pressable
                onPress={() => handleSelect('file')}
                className={`px-4 py-3 ${tipo === 'file' ? 'bg-blue-50' : ''}`}>
                <Text className="text-gray-800">Archivo</Text>
              </Pressable>
            </View>
          )}
        </View>

        {tipo === 'link' && (
          <View className="mb-4">
            <Text className="mb-2 text-gray-700">Enlace</Text>
            <TextInput
              placeholder="https://..."
              className="rounded-xl border border-gray-300 px-4 py-3 text-gray-800"
              value={link}
              onChangeText={setLink}
            />
          </View>
        )}

        {tipo === 'file' && (
          <View className="mb-4 items-center">
            <Pressable
              onPress={handlePickFile}
              disabled={loading}
              className="rounded-xl bg-gray-200 px-6 py-3 active:bg-gray-300">
              <Text className="text-gray-700">
                {archivo ? `📄 ${archivo.name}` : 'Seleccionar archivo'}
              </Text>
            </Pressable>
          </View>
        )}

        {/* Botón enviar */}
        <Pressable
          onPress={handleSubmit}
          disabled={loading}
          className={`rounded-xl ${loading ? 'bg-blue-400' : 'bg-blue-600'} py-3`}>
          <Text className="text-center text-lg font-semibold text-white">Crear</Text>
        </Pressable>
      </View>
    </View>
  );
}
