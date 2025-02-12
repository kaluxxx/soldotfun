import { create } from 'zustand'
import {User} from "@/db/types/user-table";

type UserStore = {
    user: User | null;
    setUser: (user: User) => void;
    users: User[] | null;
    setUsers: (users: User[]) => void;
}
export const useUser = create<UserStore>((set) => ({
    user: null,
    setUser: (user: User) => set({ user }),
    users: null,
    setUsers: (users: User[]) => set({ users})
}))
