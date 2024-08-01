'use client';

import {WalletAdapterNetwork} from '@solana/wallet-adapter-base';
import {ConnectionProvider, WalletProvider} from '@solana/wallet-adapter-react';
import {WalletModalProvider} from '@solana/wallet-adapter-react-ui';
import {PhantomWalletAdapter} from '@solana/wallet-adapter-wallets';
import {clusterApiUrl} from '@solana/web3.js';
import React, {ReactNode, useMemo} from 'react';
import SessionProviderClientComponent from "@/provider/session-provider";

require("@solana/wallet-adapter-react-ui/styles.css");


export const WalletConnectionProvider = ({children, session}: { children: ReactNode, session: any }) => {
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const wallets = useMemo(() => [], []);
    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <SessionProviderClientComponent session={session}>
                        {children}
                    </SessionProviderClientComponent>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};