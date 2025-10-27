import { useRegisterStore } from "@/store/registerStore";
import axios from "axios"

export default async function sendInfo(){
  const { type, credentials, topics, info } = useRegisterStore.getState()

  try {
    const response = await axios.post('http://192.168.1.37:3000/auth/signUp', {
      email: credentials.email,
      password: credentials.password,
      topics,
      name: info.name,
      surname: info.surname,
      nationality: info.nationality,
      birthdate: info.birthdate,
      type

    })

    console.log(response.data)
  } catch (error) {
    console.log(error)
  }
}