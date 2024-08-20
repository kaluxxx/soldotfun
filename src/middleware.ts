import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAuthenticated, isGranted } from "@/utils/auth";

export type ProtectedRoutes = {
    [route: string]: string[];
};

export const protectedRoutes: ProtectedRoutes = {
    "/admin": ["admin", "moderator"],
    "/admin/*": ["admin", "moderator"],
};

export default async function middleware(req: NextRequest) {
    const token = await isAuthenticated(req);

    const { pathname } = req.nextUrl;

    for (const route in protectedRoutes) {
        const regex = new RegExp(`^${route.replace("*", ".*")}$`);
        if (regex.test(pathname)) {
            const allowedRoles = protectedRoutes[route];
            if (!token || !isGranted(token, allowedRoles)) {
                const absoluteURL = new URL("/", req.nextUrl.origin);
                return NextResponse.redirect(absoluteURL.toString());
            }
        }
    }

    return NextResponse.next();
}