import { StyleSheet, Text } from "react-native";

export default function HomeScreen() {
  return <Text style={styles.textStyle}>Hola mundo</Text>;
}

const styles = StyleSheet.create({
  textStyle: {
    color: "white",
    marginTop: 50,
  },
});
