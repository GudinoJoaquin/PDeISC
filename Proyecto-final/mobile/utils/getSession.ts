import { Config } from "@/app/enum/config"
import axios from "axios"

export default async function getSession(accessToken: string) {
  try {
    const response = await axios.post(`http://${Config.IP}:${Config.PORT}/auth/session`, {
      access_token: accessToken
    })

    return response.data
  } catch (error) {
    console.log(error)
  }
}