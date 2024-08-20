import {Session as NextAuthSession} from "next-auth";
import {User} from "@/db/types/user-table";

export interface CustomSession extends NextAuthSession {
    publicKey: string;
    role: string;
}