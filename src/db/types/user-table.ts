import {Generated, Insertable, Selectable, Updateable} from "kysely";
import {UserRole} from "@/db/types/user-role";

export interface UserTable {
    id: Generated<number>;
    wallet: string;
    username: string;
    image: string;
    bio: string;
    role?: UserRole;
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<Omit<UserTable, 'role'>> & { role?: UserRole};
export type UserUpdate = Updateable<UserTable>