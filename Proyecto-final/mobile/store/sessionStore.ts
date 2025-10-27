import { create } from "zustand";

interface SessionState {
  jwt: string | null;
  user_id: string | null;
  access_token: string | null;
  setSession: (jwt: string, user_id: string, access_token: string) => void;
  clearSession: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  jwt: null,
  user_id: null,
  access_token: null,
  setSession: (jwt, user_id, access_token) =>
    set({ jwt, user_id, access_token }),
  clearSession: () =>
    set({ jwt: null, user_id: null, access_token: null }),
}));
