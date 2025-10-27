import AsyncStorage from "@react-native-async-storage/async-storage"

export default async function clearLocalSession(){
  try { 
    await AsyncStorage.clear()
    console.log("Session local eliminada")
  } catch(error){
    console.log(error)
  }
}