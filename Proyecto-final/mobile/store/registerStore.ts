import { create } from "zustand";

type userType = "alumno" | "profesor" | "institucion";

interface RegisterStoreProps {
  type: userType
  topics: string[]
  name: string,
  surname: string,
  nationality: string
  birthdate: string
  setType: (type: userType) => void,
  setTopics: (topics: string[]) => void
  setInfo: (name: string, surname: string, nationality: string, birthdate: string) => void
}

export const useRegisterStore = create<RegisterStoreProps>((set) => ({
  type: "alumno",
  name: "",
  surname: "",
  nationality: "",
  birthdate: "",
  topics: [],
  setType: (type: userType) => set({ type }),
  setTopics: (topics: string[]) => set({ topics: topics}),
  setInfo: (name: string, surname: string, nationality: string, birthdate: string) => set({ name, surname, nationality, birthdate})
}))