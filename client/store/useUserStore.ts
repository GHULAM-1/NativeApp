import {create} from 'zustand';

interface UserState {
  name: string | null;
  email: string | null;
  id: string | null;
  setUser: (name: string, email: string, id: string) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  name: null,
  email: null,
  id: null,
  setUser: (name, email, id) => set({ name, email, id }),
  clearUser: () => set({ name: null, email: null, id: null}),
}));
