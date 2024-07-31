import {Insertable, Selectable, Updateable} from 'kysely';

export interface UserFollowersTable {
    follower_id: number;
    following_id: number;
}

export type UserFollower = Selectable<UserFollowersTable>;
export type NewUserFollower = Insertable<UserFollowersTable>;
export type UserFollowerUpdate = Updateable<UserFollowersTable>;