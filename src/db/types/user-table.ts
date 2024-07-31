import {Generated, Insertable, Selectable, Updateable} from "kysely";
import {User as Follower} from "@/types/entities/user";
export interface UserTable {
    id: Generated<number>;
    wallet: string;
    username: string;
    image: string;
    bio: string;
    followers?: Follower[]; // Use Follower type instead of User
}

export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>