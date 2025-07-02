import { create } from "zustand";

const useStore = create((set) => ({
    user: JSON.parse(localStorage.getItem("ecouser")) || null,

    setCredentials: (value) => set({ user: value }),
    signOut: () => set({ user: null }),
}));

export default useStore;