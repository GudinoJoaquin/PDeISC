import { create } from 'zustand';

type AlertType = 'error' | 'success' | 'info' | 'warning';

interface AlertState {
  message: string | null;
  type: AlertType;
  visible: boolean;
  showAlert: (message: string, type?: AlertType) => void;
  hideAlert: () => void;
}

export const useAlertStore = create<AlertState>((set) => ({
  message: null,
  type: 'info',
  visible: false,
  showAlert: (message, type = 'info') => {
    set({ message, type, visible: true });
    setTimeout(() => set({ visible: false }), 5000); // se oculta después de 5s
  },
  hideAlert: () => set({ visible: false }),
}));
