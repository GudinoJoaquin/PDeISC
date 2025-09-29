import { StyleSheet, Text, View } from "react-native";
export default function Detaille() {
  return (
    <View style={{ backgroundColor: "blue", flex: 1 }}>
      <Text style={styles.textStyle}>Lo detaille</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    color: "green",
    marginTop: 20,
    fontSize: 50,
    fontWeight: "bold",
  },
});
