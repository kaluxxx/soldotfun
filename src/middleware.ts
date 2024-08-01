import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {isAuthenticated} from "@/utils/auth";


const protectedRoutes = ["/admin"];


export default async function middleware(req: NextRequest) {
    const auth = await isAuthenticated(req);
    if (!auth && protectedRoutes.includes(req.nextUrl.pathname)) {
        const absoluteURL = new URL("/", req.nextUrl.origin);
        return NextResponse.redirect(absoluteURL.toString());
    }
}