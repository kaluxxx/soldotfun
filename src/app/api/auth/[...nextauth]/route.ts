import NextAuth, {NextAuthOptions, User as NextAuthUser} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {getCsrfToken} from "next-auth/react";
import {SigninMessage} from "@/utils/sign-in-message";
import {userRepository} from "@/repository/user-repository";
import {CustomSession} from "@/types/session";

interface User extends NextAuthUser {
    role: string;
}

const providers = [
    CredentialsProvider({
        name: "Solana",
        credentials: {
            message: {
                label: "Message",
                type: "text",
            },
            signature: {
                label: "Signature",
                type: "text",
            },
        },
        async authorize(credentials, req) {
            try {

                const signinMessage = new SigninMessage(
                    JSON.parse(credentials?.message || "{}")
                );
                const nextAuthUrl = new URL(process.env.NEXTAUTH_URL as string);
                if (signinMessage.domain !== nextAuthUrl.host) {
                    return null;
                }

                const csrfToken = await getCsrfToken({ req: { ...req, body: null } });

                if (signinMessage.nonce !== csrfToken) {
                    return null;
                }

                const validationResult = await signinMessage.validate(
                    credentials?.signature || ""
                );

                if (!validationResult)
                    throw new Error("Could not validate the signed message");

                const wallet = signinMessage.publicKey;

                let user = await userRepository.findUserByWallet(wallet);

                if (!user) {
                    user = await userRepository.createUser({
                        wallet,
                        username: `${wallet.slice(0, 5)}`,
                        image: "https://m35gwivdlowrdnhv.public.blob.vercel-storage.com/profile-image-1hGbqg0s32XIJKyBuPtHTojYj0E0NE.webp",
                        bio: "I'm new here",
                    });
                }

                return {
                    id: signinMessage.publicKey,
                    role: user.role || "user",
                } as User;
            } catch (e) {
                return null;
            }
        },
    }),
];


export const authOptions: NextAuthOptions = {
    providers,
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as User).role;
                token.publicKey = (user as User).id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token.sub != null && token.role != null) {
                (session as CustomSession).publicKey = token.sub as string;
                (session as CustomSession).role = token.role as string;
            }
            return session;
        },
    },
};

const authHandler = async (req: any, res: any) => {
    return await NextAuth(req, res, authOptions);
};

export const POST = authHandler;
export const GET = authHandler;