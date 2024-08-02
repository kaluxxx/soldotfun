'use server'

import {User, UserUpdate} from "@/db/types/user-table";
import {userRepository} from "@/repository/user-repository";
import {userSchema} from "@/schema/user-schema";
import {del, put} from "@vercel/blob";

export async function getUser(wallet: string) {
    try {
        return await userRepository.findUserByWallet(wallet);
    } catch (e) {
        console.error(e);
    }
}

export async function updateUser(userId: number, userUpdate: UserUpdate): Promise<User | undefined> {
    try {
        return await userRepository.updateUser(userId, userUpdate);
    } catch (e) {
        console.error(e);
    }
}

export async function uploadImage(userId: number, formData: FormData): Promise<string | undefined> {
    const DEFAULT_IMAGE = "https://m35gwivdlowrdnhv.public.blob.vercel-storage.com/profile-image-1hGbqg0s32XIJKyBuPtHTojYj0E0NE.webp";

    try {
        const user = await userRepository.findUserById(userId);
        if (!user) {
            throw new Error(`User with id ${userId} not found`);
        }

        const image = formData.get("profileImage") as File;
        if (!image) {
            throw new Error("No image provided");
        }

        const validateField = userSchema.safeParse({
            ...user,
            profileImage: image,
        });

        if (!validateField.success) {
            throw new Error(validateField.error.errors[0].message);
        }

        const {url} = await put(image.name, image, {
            access: "public",
        });

        if (url && user.image !== DEFAULT_IMAGE) {
            await del(user.image);
        }
        return url;
    } catch (e) {
        console.error(e);
    }
}
