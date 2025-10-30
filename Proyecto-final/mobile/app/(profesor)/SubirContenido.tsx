import { View, Text, TextInput, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSessionStore } from '@/store/sessionStore';
import { useAlertStore } from '@/store/alertStore';
import { useState } from 'react';
import axios from 'axios';
import Alert from '@/components/Alert';
import { Config } from '@/enum/config';
import * as DocumentPicker from 'expo-document-picker';

export default function SubirContenido() {
  const router = useRouter();
  const { session } = useSessionStore();
  const { showAlert } = useAlertStore();

  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tipo, setTipo] = useState<'link' | 'file' | ''>('');
  const [link, setLink] = useState('');
  const [archivo, setArchivo] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handlePickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
      });
      if (result.canceled) return;
      const file = result.assets[0];
      setArchivo(file);
    } catch (error) {
      console.log(error);
      showAlert('Error al seleccionar el archivo.', 'error');
    }
  };

  const handleSubmit = async () => {
    if (!titulo.trim() || !descripcion.trim()) {
      showAlert('Por favor, completá todos los campos.', 'error');
      return;
    }

    if (!tipo) {
      showAlert('Seleccioná si querés subir un archivo o un enlace.', 'error');
      return;
    }

    if (tipo === 'link' && !link.trim()) {
      showAlert('Ingresá un enlace válido.', 'error');
      return;
    }

    if (tipo === 'file' && !archivo) {
      showAlert('Seleccioná un archivo para subir.', 'error');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('titulo', titulo);
      formData.append('descripcion', descripcion);
      formData.append('profesor', session?.user?.id || '');

      if (tipo === 'link') {
        formData.append('link', link);
      } else if (archivo) {
        formData.append('archivo', {
          uri: archivo.uri,
          name: archivo.name,
          type: archivo.mimeType || 'application/octet-stream',
        } as any);
      }

      const response = await axios.post(
        `http://${Config.IP}:${Config.PORT}/profesor/class/create`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      console.log(response.data);
      showAlert('Clase creada con éxito 🎉', 'success');
      setTitulo('');
      setDescripcion('');
      setLink('');
      setArchivo(null);
      setTipo('');
      setDropdownOpen(false);
    } catch (error) {
      console.log(error);
      showAlert('Ocurrió un error al crear la clase.', 'error');
    }
  };

  const handleSelect = (value: 'link' | 'file') => {
    setTipo(value);
    setDropdownOpen(false);
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

        {/* Selector personalizado */}
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

        {/* Campos dinámicos */}
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
              className="rounded-xl bg-gray-200 px-6 py-3 active:bg-gray-300">
              <Text className="text-gray-700">
                {archivo ? `📄 ${archivo.name}` : 'Seleccionar archivo'}
              </Text>
            </Pressable>
          </View>
        )}

        {/* Botón Crear */}
        <Pressable onPress={handleSubmit} className="rounded-xl bg-blue-600 py-3">
          <Text className="text-center text-lg font-semibold text-white">Crear</Text>
        </Pressable>
      </View>
    </View>
  );
}
