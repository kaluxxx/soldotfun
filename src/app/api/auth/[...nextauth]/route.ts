import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCsrfToken } from "next-auth/react";
import { SigninMessage } from "@/utils/sign-in-message";
import {userRepository} from "@/repository/user-repository";

const authHandler = async (req: any, res: any) => {
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
                            username: `@${wallet.slice(0, 5)}`,
                            image: `profile-image.png`,
                            bio: "I'm new here",
                        });
                    }

                    return {
                        id: signinMessage.publicKey,
                    };
                } catch (e) {
                    return null;
                }
            },
        }),
    ];


    return await NextAuth(req, res, {
        providers,
        session: {
            strategy: "jwt",
        },
        secret: process.env.NEXTAUTH_SECRET,
        callbacks: {
            async session({ session, token }) {
                // @ts-ignore
                session.publicKey = token.sub;
                if (session.user) {
                    session.user.name = token.sub;
                    session.user.image = `https://ui-avatars.com/api/?name=${token.sub}&background=random`;
                }

                return session;
            },
        },
    });
};

export const POST = authHandler;
export const GET = authHandler;