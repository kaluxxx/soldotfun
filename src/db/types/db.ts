import {UserTable} from "@/db/types/user-table";
import {UserFollowersTable} from "@/db/types/user-followers-table";
import {ProjectTable} from "@/db/types/project-table";

export interface Database {
    user: UserTable,
    userFollowers: UserFollowersTable,
    project: ProjectTable,

}