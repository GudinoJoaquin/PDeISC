//Importación de modulos que vamos a mostrar
import { StatusBar } from "expo-status-bar";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Button,
  ActivityIndicator,
  TouchableHighlight,
  Pressable,
} from "react-native";

export default function App() {
  return (
    //Contenedor principal
    <View style={styles.container}>
      {/* StatusBar para poder ver la barra de estado (bateria, wifi, etc) */}
      <StatusBar style="dark" />
      {/* Titulo principal (Todos los textos deben estar entre el componente Text) */}
      <Text style={styles.title}>Esto es un react native</Text>
      {/* Contenedor View, es como div para separar contenidos */}
      <View style={styles.mainContent}>
        <Text style={styles.subtitle}>Estos son los componentes</Text>
        <ScrollView>
          {/* ScrollView, como View pero permite hacer scroll tanto vertical como horizontal */}
          <Text style={styles.textComponent}>Esto es un texto</Text>
          <View style={styles.viewComponent}>
            <Text>Esto es un view</Text>
          </View>
          <View style={styles.imageComponent}>
            <Text style={{ marginBottom: 15, fontWeight: "bold" }}>
              Esto es una imagen
            </Text>
            {/* Imagen, para agregar imagenes, puede ser path de archivo o link de imagen, en caso de ser link, debe llevar las dimensiones de la imagen */}
            <Image
              source={{
                uri: "https://imgs.search.brave.com/7QmAXrIsycRu3CzYei5SxilfJjfkpL-syN6KLanGV2k/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLmV0/c3lzdGF0aWMuY29t/LzUyMzE3MDU0L3Iv/aWwvOTNhMmJhLzcx/MTI5MTU2NzUvaWxf/MzAweDMwMC43MTEy/OTE1Njc1XzkyZXEu/anBn",
              }}
              style={{ width: 150, height: 150, borderRadius: 10 }}
            />
          </View>
          <View style={styles.scrollViewComponent}>
            {/* ScrollView, agregamos muchos text para poder hacer scroll */}
            <ScrollView style={{ height: 100 }} nestedScrollEnabled={true}>
              <Text>Esto es un scrollView</Text>
              <Text>Esto es un scrollView</Text>
              <Text>Esto es un scrollView</Text>
              <Text>Esto es un scrollView</Text>
              <Text>Esto es un scrollView</Text>
              <Text>Esto es un scrollView</Text>
              <Text>Esto es un scrollView</Text>
              <Text>Esto es un scrollView</Text>
              <Text>Esto es un scrollView</Text>
              <Text>Esto es un scrollView</Text>
              <Text>Esto es un scrollView</Text>
              <Text>Esto es un scrollView</Text>
              <Text>Esto es un scrollView</Text>
              <Text>Esto es un scrollView</Text>
              <Text>Esto es un scrollView</Text>
              <Text>Esto es un scrollView</Text>
              <Text>Esto es un scrollView</Text>
            </ScrollView>
          </View>
          <View>
            {/* Text input, funciona igual a un input normal */}
            <TextInput
              placeholder="Esto es un input"
              style={styles.inputComponent} //La propiedad style siempre debe ser un objeto
            />
          </View>
          <View style={styles.buttonComponent}>
            {/* Componente de boton, preferible usar el Pressable para mayor flexibilidad */}
            <Button title="Esto es un boton" onPress={() => alert("Hola")} />
          </View>
          <View style={styles.activityComponent}>
            <Text style={{ marginBottom: 20 }}>
              Esto es un Activity Indicator
            </Text>
            {/* Indicador de carga, se le puede indicar tamaño y color */}
            <ActivityIndicator size="large" />
          </View>
          <View style={styles.activityComponent}>
            <Text style={{ marginBottom: 20 }}>
              Esto es un Touchable Highlight
            </Text>
            {/* Similar al boton, con un efecto al presionarse */}
            <TouchableHighlight onPress={() => alert("Hola")}>
              <View>
                <Text style={{ backgroundColor: "lightgray", padding: 10 }}>
                  Touchable Highlight
                </Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.buttonComponent}>
            <Text style={{ marginBottom: 20 }}>Esto es un Pressable</Text>
            {/* Misma funcionalidad que el boton, pero permite hacer presionable cualquier componente */}
            <Pressable onPress={() => alert("Esto es un pressable")}>
              <Text>Pressable</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

//Creamos estils con StyleSheet.create
const styles = StyleSheet.create({
  //Definir objeto de estilos, similar a CSS con algunos agregados
  //Por defecto los componentes de contenedor tienen display flex
  container: {
    marginTop: 45,
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 24,
  },
  mainContent: {
    alignItems: "center",
    gap: 20,
    flex: 1,
    width: "100%", //Algunas propiedades aceptan numeros y strings
  },
  subtitle: {
    fontWeight: "600",
    fontSize: 20,
    marginVertical: 10,
  },
  textComponent: {
    fontSize: 16,
    borderWidth: 2,
    borderColor: "gray",
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  viewComponent: {
    width: "100%",
    height: 200,
    borderWidth: 2,
    marginBottom: 20,
    borderColor: "gray",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  imageComponent: {
    width: "100%",
    height: 200,
    borderWidth: 2,
    marginBottom: 20,
    borderColor: "gray",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollViewComponent: {
    marginBottom: 20,
    backgroundColor: "white",
    borderColor: "gray",
    borderRadius: 10,
    borderWidth: 2,
    padding: 10,
  },
  inputComponent: {
    marginBottom: 20,
    backgroundColor: "white",
    borderColor: "gray",
    borderRadius: 10,
    borderWidth: 2,
    padding: 10,
  },
  buttonComponent: {
    marginBottom: 20,
    backgroundColor: "white",
    borderColor: "gray",
    borderRadius: 10,
    borderWidth: 2,
    padding: 10,
  },
  activityComponent: {
    marginBottom: 20,
    backgroundColor: "white",
    borderColor: "gray",
    borderRadius: 10,
    borderWidth: 2,
    padding: 10,
    height: 120,
    width: "100%",
  },
});
