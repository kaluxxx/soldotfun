import {Follower} from "@/types/entities/follower";
import {create} from "zustand";

type FollowStore = {
    followers: Follower[] | null;
    setFollowers: (followers: Follower[]) => void;
    following: Follower[] | null;
    setFollowing: (following: Follower[]) => void;
}

export const useFollow = create<FollowStore>((set) => ({
    followers: null,
    setFollowers: (followers: Follower[]) => set({ followers }),
    following: null,
    setFollowing: (following: Follower[]) => set({ following })
}))