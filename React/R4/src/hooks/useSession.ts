import { useEffect, useState } from "react";
import { supabase } from "../config/supabase";
import type {Session} from "@supabase/supabase-js"


export default function useSession(){
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.log(error);
        setSession(null)
        return;
      }

      if (data) {
        setSession(data.session)
      }
    };
    getSession();
  }, []);


  return { session }
}