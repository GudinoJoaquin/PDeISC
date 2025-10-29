import { create } from "zustand";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/config/supabase";

interface SessionState {
  session: Session | null;
  setSession: (session: Session) => void;
  clearSession: () => void;
  refreshSession: () => Promise<void>;
}

export const useSessionStore = create<SessionState>((set) => ({
  session: null,

  setSession: (session) => set({ session }),

  clearSession: () => set({ session: null }),

  refreshSession: async () => {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.log("Error al refrescar la sesión:", error.message);
      return;
    }

    if (data.session) {
      set({ session: data.session });
      console.log("Sesión actualizada correctamente ✅");
    }
  },
}));
