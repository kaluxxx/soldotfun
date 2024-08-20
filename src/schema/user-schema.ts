import {z} from "zod";

const MAX_FILE_SIZE = 5000000;

const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];

export const userSchema = z.object({
    image: z.string().optional(),
    username: z.string().min(2).max(50),
    bio: z.string().max(160),
});
