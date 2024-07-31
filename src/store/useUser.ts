import { create } from 'zustand'
import {User} from "@/types/entities/user";

type UserStore = {
    user: User | null;
    setUser: (user: User) => void;
}
export const useUser = create<UserStore>((set) => ({
    user: null,
    setUser: (user: User) => set({ user })
}))
