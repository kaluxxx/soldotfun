import {User} from "@/db/types/user-table";
import {Project} from "@/db/types/project-table";
import {Follower} from "@/types/entities/follower";

export type Response<T> = {
    status: number;
    message?: string;
    data?: T;
};

export type UserResponse = Response<User>;
export type UsersResponse = Response<User[]>;
export type FollowersResponse = Response<Follower[]>;
export type FollowingResponse = FollowersResponse;
export type FollowResponse = Response<null>;
export type ProjectResponse = Response<Project>;
export type ProjectsResponse = Response<Project[]>;
export type ImageResponse = Response<string>;
