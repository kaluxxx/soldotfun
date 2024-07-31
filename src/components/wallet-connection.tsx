'use client';

import {useSession, signIn, getCsrfToken, signOut} from "next-auth/react";
import {useWallet} from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import Link from "next/link";
import {useCallback, useEffect} from "react";
import {useWalletModal} from "@solana/wallet-adapter-react-ui";
import {SigninMessage} from "@/utils/sign-in-message";
import {Button} from "@/components/ui/button";
import {Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger} from "@/components/ui/menubar";
import {useUser} from "@/store/useUser";
import {get} from "@/app/actions/user";
import {useRouter} from "next/navigation";

const WalletConnection = () => {
    const {user, setUser} = useUser();
    const {data: session, status} = useSession();
    const router = useRouter()


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

            const response = await signIn("credentials", {
                message: JSON.stringify(message),
                redirect: false,
                signature: serializedSignature,
            });

            if (response && response.ok) {
                router.push('/profile')
            }
        } catch (error) {
            console.log(error);
        }
    }, [router, wallet, walletModal]);

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
        const fetchUser = async () => {
            if (!session || !wallet.connected) return;

            const publicKey = wallet.publicKey?.toBase58();

            if (!publicKey) return;

            const user = await get(publicKey);

            if (!user) return;

            setUser(user);
        }

        fetchUser();
    }, [session, setUser, wallet.connected, wallet.publicKey]);

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
                            className="px-4 py-2 cursor-pointer border-node bg-transparent hover:bg-gray-800">Profile</MenubarTrigger>
                        <MenubarContent
                            className="bg-gradient-to-b from-cyan via-blue to-primary p-px">
                            <div
                                className="bg-gradient-to-b from-cyan via-blue to-primary p-px">
                                <div className="bg-background p-2 rounded-md">
                                    <MenubarItem>
                                        <Link href="/profile" className="block px-4 py-2 rounded-md hover:bg-gray-800">
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