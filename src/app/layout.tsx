import React from 'react';
import {WalletConnectionProvider} from '@/provider/wallet-connection-provider';
import Header from '@/components/header';
import Footer from '@/components/footer';
import "@/app/globals.css";
import {getServerSession} from "next-auth";
import {Toaster} from "react-hot-toast";


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
                <Toaster
                    position="top-right"
                    toastOptions={{
                        className: 'border border-primary/20',
                    }}
                />
        </WalletConnectionProvider>
        </body>
        </html>
    );
}