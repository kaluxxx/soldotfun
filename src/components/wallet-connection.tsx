'use client';

import {useSession, signIn, getCsrfToken, signOut} from "next-auth/react";
import {useWallet} from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import Link from "next/link";
import {useCallback, useEffect, useState} from "react";
import {useWalletModal} from "@solana/wallet-adapter-react-ui";
import {SigninMessage} from "@/utils/sign-in-message";
import {NavigationMenuContent, NavigationMenuLink, NavigationMenuTrigger} from "@/components/ui/navigation-menu";
import {Button} from "@/components/ui/button";
import {Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger} from "@/components/ui/menubar";

const WalletConnection = () => {
    const {data: session, status} = useSession();

    const wallet = useWallet();
    const walletModal = useWalletModal();


    const handleSignIn = useCallback(async () => {
        try {
            if (!wallet.connected) {
                walletModal.setVisible(true);
            }

            const csrf = await getCsrfToken();
            if (!wallet.publicKey || !csrf || !wallet.signMessage) return;

            const message = new SigninMessage({
                domain: window.location.host,
                publicKey: wallet.publicKey?.toBase58(),
                statement: `Sign this message to sign in to the app.`,
                nonce: csrf,
            });

            const data = new TextEncoder().encode(message.prepare());
            const signature = await wallet.signMessage(data);
            const serializedSignature = bs58.encode(signature);

            await signIn("credentials", {
                message: JSON.stringify(message),
                redirect: false,
                signature: serializedSignature,
            });
        } catch (error) {
            console.log(error);
        }
    }, [wallet, walletModal]);

    const handleSignOut = async () => {
        await wallet.disconnect();
        await signOut();
    }

    useEffect(() => {
        if (wallet.connected && status === "unauthenticated") {
            handleSignIn();
        }
    }, [handleSignIn, status, wallet.connected]);

    useEffect(() => {
        console.log("session", session);
    }, [session]);

    return (

        <div className="relative">
            {!session ? (
                <span
                    className="block p-2 rounded-md hover:bg-gray-800 cursor-pointer"
                    onClick={handleSignIn}
                >
                                                Profile
                                            </span>
            ) : (
                <Menubar>
                    <MenubarMenu>
                        <MenubarTrigger
                            className="cursor-pointer border-node bg-transparent">Profile</MenubarTrigger>
                        <MenubarContent
                            className="bg-gradient-to-b from-cyan via-blue to-primary p-px">
                            <div
                                className="bg-gradient-to-b from-cyan via-blue to-primary p-px">
                                <div className="bg-background p-2">
                                    <MenubarItem>
                                        <Link href="/profile" className="block p-2 hover:bg-gray-800">
                                            Profile
                                        </Link>
                                    </MenubarItem>
                                    <MenubarItem>
                                        <Button onClick={handleSignOut}
                                                className="block p-2 hover:bg-gray-800 bg-transparent">
                                            Sign out
                                        </Button>
                                    </MenubarItem>
                                </div>
                            </div>
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
            )}
        </div>
    );
};

export default WalletConnection;