'use server'

import { userFollowersRepository } from "@/repository/user-followers-repositoy";
import { FollowersResponse, FollowingResponse, FollowResponse } from "@/types/response";

export async function getFollowersById(userId: number): Promise<FollowersResponse> {
    try {
        const followers = await userFollowersRepository.getFollowers(userId);
        return { status: 200, data: followers };
    } catch (e: any) {
        console.error(e);
        return { status: 500, message: e.message };
    }
}

export async function getFollowingById(userId: number): Promise<FollowingResponse> {
    try {
        const following = await userFollowersRepository.getFollowing(userId);
        return { status: 200, data: following };
    } catch (e: any) {
        console.error(e);
        return { status: 500, message: e.message };
    }
}

export async function followUser(userId: number, followerId: number): Promise<FollowResponse> {
    try {
        await userFollowersRepository.followUser(userId, followerId);
        return { status: 200, data: null, message: 'User followed successfully' };
    } catch (e: any) {
        console.error(e);
        return { status: 500, message: e.message };
    }
}

export async function unfollowUser(userId: number, followerId: number): Promise<FollowResponse> {
    try {
        await userFollowersRepository.unfollowUser(userId, followerId);
        return { status: 200, data: null, message: 'User unfollowed successfully' };
    } catch (e: any) {
        console.error(e);
        return { status: 500, message: e.message };
    }
}