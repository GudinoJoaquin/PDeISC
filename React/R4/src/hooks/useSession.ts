import { useEffect, useState } from "react";
import { supabase } from "../config/supabase";
import type { Session } from "@supabase/supabase-js"

/**
 * Hook personalizado para obtener y manejar la sesión actual del usuario con Supabase.
 */
export default function useSession(){
  // Estado para almacenar la sesión actual
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    // Función asíncrona para obtener la sesión desde Supabase
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        // Si ocurre un error, se muestra en consola y se limpia la sesión
        console.log(error);
        setSession(null)
        return;
      }

      if (data) {
        // Si se obtiene la sesión correctamente, se actualiza el estado
        setSession(data.session!)
      }
    };
    // Se ejecuta la función al montar el componente
    getSession();
  }, []);

  // Retorna la sesión actual
  return { session }
}