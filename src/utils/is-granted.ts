import { CustomSession } from "@/types/session";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export const isGranted = async (roles: string[]): Promise<boolean> => {
    const session = await getServerSession(authOptions) as CustomSession;
    return roles.includes(session?.role);
}