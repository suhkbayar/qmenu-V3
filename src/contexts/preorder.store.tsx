import create from 'zustand';
import { persist, StateStorage } from 'zustand/middleware';
import { get, set, del } from 'idb-keyval';
import { IOrder } from '../types/order';

const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await get(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await del(name);
  },
};

interface PreOrderStore {
  orders: IOrder[];
  load: (e: IOrder[]) => void;
}

export const usePreOrderStore = create<PreOrderStore>(
  persist(
    (set) => ({
      orders: [],
      load: (orders) => set({ orders }),
    }),
    {
      name: 'preorder-storage',
      getStorage: () => storage,
    },
  ),
);
