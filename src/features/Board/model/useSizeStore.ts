import { create } from 'zustand';

interface SizeStore {
  size: number;
  setSize: (size: number) => void;
}

export const useSizeStore = create<SizeStore>((set) => ({
  size: 5,
  setSize: (size) => set({ size }),
}));
