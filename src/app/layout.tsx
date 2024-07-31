import React from 'react';
import { WalletConnectionProvider } from '@/provider/wallet-connection-provider';
import Header from '@/components/header';
import Footer from '@/components/footer';
import "@/app/globals.css";
import {getServerSession} from "next-auth";

export default async function RootLayout({children}: { children: React.ReactNode }) {
    const session = await getServerSession();

    return (
        <html lang="en">
        <body className="min-h-screen bg-image font-sans antialiased flex flex-col justify-between">
            <WalletConnectionProvider session={session}>
                <Header/>
                <main className="flex-1 w-full flex flex-col items-center">
                    {children}
                </main>
                <Footer/>
            </WalletConnectionProvider>
        </body>
        </html>
    );
}