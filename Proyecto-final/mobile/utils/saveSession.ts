import AsyncStorage from '@react-native-async-storage/async-storage';

export default function saveSession({ token, user_id, access_token }: {token: string, user_id: string, access_token: string}) {
  try {
    AsyncStorage.setItem("jwt", token)
    AsyncStorage.setItem("user_id", user_id)
    AsyncStorage.setItem("access_token", access_token)
    console.log("Session guardada correctamente")
  } catch (error) {
    console.log(error)
  }
}