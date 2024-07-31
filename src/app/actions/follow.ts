'use server'


import {userFollowersRepository} from "@/repository/user-followers-repositoy";

export async function getFollowersById(userId: number) {
    try {
        return await userFollowersRepository.getFollowers(userId);
    } catch (e) {
        console.error(e);
    }
}

export async function getFollowingById(userId: number) {
    try {
        return await userFollowersRepository.getFollowing(userId);
    } catch (e) {
        console.error(e);
    }
}

export async function followUser(userId: number, followerId: number) {
    try {
        return await userFollowersRepository.followUser(userId, followerId);
    } catch (e) {
        console.error(e);
    }
}

export async function unfollowUser(userId: number, followerId: number) {
    try {
        return await userFollowersRepository.unfollowUser(userId, followerId);
    } catch (e) {
        console.error(e);
    }
}