import {UserTable} from "@/db/types/user-table";
import {UserFollowersTable} from "@/db/types/user-followers-table";

export interface Database {
    user: UserTable
    userFollowers: UserFollowersTable
}