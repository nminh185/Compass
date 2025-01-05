import { create } from 'zustand';

interface ProgressStore {
  current: number;
  total: number;
  isProcessing: boolean;
  setProgress: (current: number, total: number) => void;
  startProcessing: () => void;
  endProcessing: () => void;
  reset: () => void;
}

export const useProgressStore = create<ProgressStore>((set) => ({
  current: 0,
  total: 0,
  isProcessing: false,
  setProgress: (current, total) => set({ current, total }),
  startProcessing: () => set({ isProcessing: true }),
  endProcessing: () => set({ isProcessing: false }),
  reset: () => set({ current: 0, total: 0, isProcessing: false }),
}));