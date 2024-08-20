import {getToken} from "next-auth/jwt";
import {NextRequest} from "next/server";

export async function isAuthenticated(req: NextRequest): Promise<any> {
    return await getToken({req, secret: process.env.NEXTAUTH_SECRET});
}

export function isGranted(token: any, roles: string[]): boolean {
    if (!token.role) return false;
    return roles.includes(token.role);
}
