import {db} from '@/db/database'
import {Follower} from "@/types/entities/follower";

export async function getFollowers(userId: number) : Promise<Follower[]> {
    return await db
        .selectFrom('userFollowers')
        .innerJoin('user', 'userFollowers.follower_id', 'user.id')
        .select(['user.id', 'user.username', 'user.image'])
        .where('userFollowers.following_id', '=', userId)
        .execute();
}

export async function getFollowing(userId: number) : Promise<Follower[]> {
    return await db
        .selectFrom('userFollowers')
        .innerJoin('user', 'userFollowers.following_id', 'user.id')
        .select(['user.id', 'user.username', 'user.image'])
        .where('userFollowers.follower_id', '=', userId)
        .execute();
}

export async function followUser(userId: number, followerId: number) {
    await db
        .insertInto('userFollowers')
        .values({following_id: userId, follower_id: followerId})
        .execute();
}

export async function unfollowUser(userId: number, followerId: number) {
    await db
        .deleteFrom('userFollowers')
        .where('following_id', '=', userId)
        .where('follower_id', '=', followerId)
        .execute();
}
