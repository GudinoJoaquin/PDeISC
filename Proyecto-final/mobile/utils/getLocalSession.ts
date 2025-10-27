import AsyncStorage from "@react-native-async-storage/async-storage"

export default async function getLocalSession(){
  try { 
    const token = await AsyncStorage.getItem("jwt")
    const user_id = await AsyncStorage.getItem("user_id")
    const access_token = await AsyncStorage.getItem("access_token")
    return {token, user_id, access_token}
  } catch(error){
    console.log(error)
  }
}