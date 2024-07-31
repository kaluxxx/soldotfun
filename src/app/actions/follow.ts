'use server'

import {getFollowers, getFollowing, followUser, unfollowUser} from "@/repository/user-followers-repositoy";

export async function getFollowersById(userId: number) {
    try {
        return await getFollowers(userId);
    } catch (e) {
        console.error(e);
    }
}

export async function getFollowingById(userId: number) {
    try {
        return await getFollowing(userId);
    } catch (e) {
        console.error(e);
    }
}

export async function follow(userId: number, followerId: number) {
    try {
        return await followUser(userId, followerId);
    } catch (e) {
        console.error(e);
    }
}

export async function unfollow(userId: number, followerId: number) {
    try {
        return await unfollowUser(userId, followerId);
    } catch (e) {
        console.error(e);
    }
}