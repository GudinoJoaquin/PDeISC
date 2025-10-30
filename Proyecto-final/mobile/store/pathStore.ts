import { create } from "zustand";

interface PathStoreProps {
  previousPath: string | null;
  setPreviousPath: (path: string) => void;
  clearPreviousPath: () => void;
}

export const usePathStore = create<PathStoreProps>((set) => ({
  previousPath: null,

  setPreviousPath: (path) => set({ previousPath: path }),

  clearPreviousPath: () => set({ previousPath: null }),
}));
