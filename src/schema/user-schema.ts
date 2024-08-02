import {z} from "zod";

const MAX_FILE_SIZE = 5000000;

const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];

export const userSchema = z.object({
    profileImage: z
        .any()
        .refine((file) => {
            return !(file.size === 0 || file.name === undefined);
        }, "Please update or add new image.")
        .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
            ".jpg, .jpeg, .png and .webp files are accepted."
        )
        .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`),
    username: z.string().min(2).max(50),
    bio: z.string().max(160),
});
