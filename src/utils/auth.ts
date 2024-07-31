import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function isAuthenticated(req: NextRequest): Promise<boolean> {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    return !!token;
}