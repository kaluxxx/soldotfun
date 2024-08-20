'use server';

import { userRepository } from "@/repository/user-repository";
import { userSchema } from "@/schema/user-schema";
import { del } from "@vercel/blob";
import {handleBase64Image, handleFileUpload} from "@/utils/upload-file";
import { UserResponse, UsersResponse, ImageResponse } from "@/types/response";

export async function getUsers(): Promise<UsersResponse> {
    try {
        const users = await userRepository.findAllUsers();
        return { status: 200, data: users };
    } catch (e: any) {
        console.error(e);
        return { status: 500, message: e.message };
    }
}

export async function getUser(wallet: string): Promise<UserResponse> {
    try {
        const user = await userRepository.findUserByWallet(wallet);
        if (!user) {
            return { status: 404, message: "User not found" };
        }
        return { status: 200, data: user };
    } catch (e: any) {
        console.error(e);
        return { status: 500, message: e.message };
    }
}

export async function updateUser(userId: number, formData: FormData): Promise<UserResponse> {
    try {
        const userToUpdate = userSchema.parse({
            username: formData.get("username") as string,
            bio: formData.get("bio") as string,
            image: (formData.get("image") as string).startsWith("data:image") ?
                await handleBase64Image(formData.get("image") as string)
                : formData.get("image") as string,
        });

        const validateField = userSchema.safeParse(userToUpdate);

        if (!validateField.success) {
            return { status: 400, message: validateField.error.errors[0].message };
        }

        const updatedUser = await userRepository.updateUser(userId, userToUpdate);

        return { status: 200, data: updatedUser, message: "User updated successfully" };
    } catch (e: any) {
        console.error(e);
        return { status: 500, message: e.message };
    }
}

export async function uploadImage(userId: number, formData: FormData): Promise<ImageResponse> {
    const DEFAULT_IMAGE = "https://m35gwivdlowrdnhv.public.blob.vercel-storage.com/profile-image-1hGbqg0s32XIJKyBuPtHTojYj0E0NE.webp";

    try {
        const user = await userRepository.findUserById(userId);
        if (!user) {
            return { status: 404, message: `User with id ${userId} not found` };
        }

        const image = formData.get("profileImage") as File;
        if (!image) {
            return { status: 400, message: "No image provided" };
        }

        const validateField = userSchema.safeParse({
            ...user,
            profileImage: image,
        });

        if (!validateField.success) {
            return { status: 400, message: validateField.error.errors[0].message };
        }

        const url = await handleFileUpload(image);

        if (url && user.image !== DEFAULT_IMAGE) {
            await del(user.image);
        }
        return { status: 200, data: url };
    } catch (e: any) {
        console.error(e);
        return { status: 500, message: e.message };
    }
}