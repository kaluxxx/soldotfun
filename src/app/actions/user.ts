'use server'

import {UserDTO} from "@/types/dtos/userDTO";
import {User} from "@/types/entities/user";
import {userRepository} from "@/repository/user-repository";
import {writeFile} from "node:fs/promises";
import path from "node:path";
import {unlink} from "node:fs";
import {userFormSchema} from "@/formSchema/user-form-schema";

export async function getUser(wallet: string) {
    try {
        return await userRepository.findUserByWallet(wallet);
    } catch (e) {
        console.error(e);
    }
}

export async function updateUser(userId: number, userDTO: UserDTO): Promise<User | undefined> {
    try {
        return await userRepository.updateUser(userId, userDTO);
    } catch (e) {
        console.error(e);
    }
}

export async function uploadImage(userId: number, formData: FormData): Promise<string | undefined> {
    const DEFAULT_IMAGE = "profile-image.webp";

    try {
        const user = await userRepository.findUserById(userId);
        if (!user) {
            throw new Error(`User with id ${userId} not found`);
        }

        const image = formData.get("profileImage");
        if (!image) {
            throw new Error("No image provided");
        }

        const validateField = userFormSchema.safeParse({
            ...user,
            profileImage: image,
        });

        if (!validateField.success) {
            throw new Error(validateField.error.errors[0].message);
        }

        const imageUrl = await uploadFile(image as File);

        if (imageUrl && user.image !== DEFAULT_IMAGE) {
            deleteFile(user.image);
        }
        return imageUrl;
    } catch (e) {
        console.error(e);
    }
}

async function uploadFile(file: File): Promise<string> {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + file.name.replaceAll(" ", "_");

    try {
        const filePath = path.join(process.cwd(), "public/uploads", filename);
        await writeFile(filePath, buffer);
        return filename;
    } catch (e) {
        console.error("Error uploading file: ", e);
        throw new Error("File upload failed");
    }
}

function deleteFile(filename: string) {
    if (filename) {
        try {
            unlink(path.join(process.cwd(), "public/uploads/" + filename), (err) => {
                if (err) {
                    console.error("Error deleting old image: ", err);
                }
            });
        } catch (e) {
            console.error("Error deleting old image: ", e);
        }
    }
}