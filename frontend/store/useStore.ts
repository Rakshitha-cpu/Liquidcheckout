import { create } from 'zustand';

interface LiquidStore {
  userId: string;
  theme: 'dark' | 'light';
  recoveryCount: number;
  setUserId: (id: string) => void;
  toggleTheme: () => void;
  incrementRecovery: () => void;
}

export const useLiquidStore = create<LiquidStore>((set) => ({
  userId: 'U101',
  theme: 'dark',
  recoveryCount: 0,
  setUserId: (id) => set({ userId: id }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  incrementRecovery: () => set((state) => ({ recoveryCount: state.recoveryCount + 1 })),
}));
