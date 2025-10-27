import axios from "axios"

export default async function getSession(accessToken: string) {
  try {
    const response = await axios.post('http://192.168.1.37:3000/auth/session', {
      access_token: accessToken
    })

    return response.data
  } catch (error) {
    console.log(error)
  }
}