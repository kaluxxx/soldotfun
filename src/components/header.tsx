'use client';

import {useState, useEffect, useRef} from "react";
import Image from "next/image";
import soldotfun from "../assets/images/soldotfun.png";
import soldotfunText from "../assets/images/soldotfun-text.png";
import Link from "next/link";
import {
    NavigationMenu, NavigationMenuIndicator,
    NavigationMenuItem, NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import WalletConnection from "@/components/wallet-connection";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger
} from "@/components/ui/menubar";
import {useUser} from "@/store/useUser";
import {usePathname} from "next/navigation";

function Header() {
    const pathname = usePathname();
    const {user} = useUser();
    const [isConnected, setIsConnected] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const serviceLinks = [
        {id: 1, name: "Web site development", href: "/web-site-development"},
        {id: 2, name: "Graphic design", href: "/graphic-design"},
        {id: 3, name: "Marketing", href: "/marketing"},
    ];

    const socialLinks = [
        {id: 1, name: "Twitter", href: "https://twitter.com/soldotfun"},
        {id: 2, name: "Telegram", href: "https://t.me/solfunportal"},
    ];

    const navLinks = [
        {id: 1, name: "Launchpad", href: "/"},
        {id: 3, name: "Services", href: "/services", subLinks: serviceLinks},
        {id: 4, name: "Socials", href: "/socials", subLinks: socialLinks},
        {id: 5, name: "Profile", href: "/profile", component: <WalletConnection/>}
    ];

    if (user && user?.role !== "user") {
        navLinks.push({ id: 6, name: "Admin", href: "/admin" });
    }

    return (
        <header className="w-full relative">
            <nav className="flex justify-between items-center w-full px-4 py-2 bg-transparent">
                <Link href="/" className="flex items-center gap-2">
                    <Image src={soldotfun} alt="Soldotfun" className="w-24" priority={true}/>
                </Link>
                <div className="md:hidden">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-white focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            ></path>
                        </svg>
                    </button>
                </div>
                <div className="md:flex hidden w-full md:w-auto">
                    <NavigationMenu>
                        <NavigationMenuList className="flex flex-col md:flex-row gap-2">
                            {navLinks.map((link) => (
                                <NavigationMenuItem key={link.id}>
                                    {link.subLinks ? (
                                        <Menubar>
                                            <MenubarMenu>
                                                <MenubarTrigger
                                                    className="px-4 py-2 cursor-pointer border-node bg-transparent hover:bg-gray-800 font-semibold">{link.name}</MenubarTrigger>
                                                <MenubarContent
                                                    className="bg-gradient-to-b from-cyan via-blue to-primary p-px">
                                                    <div
                                                        className="bg-gradient-to-b from-cyan via-blue to-primary p-px">
                                                        <div className="bg-background p-2 rounded-md">
                                                            {link.subLinks.map((subLink) => (
                                                                <MenubarItem key={subLink.id}>
                                                                    <Link href={subLink.href}
                                                                          className={`block px-4 py-2 rounded-md hover:bg-gray-800 ${pathname === link.href ? 'bg-gray-800' : '' }`}
                                                                    >
                                                                        {subLink.name}
                                                                    </Link>
                                                                </MenubarItem>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </MenubarContent>
                                            </MenubarMenu>
                                        </Menubar>
                                    ) : (
                                        link.name === "Profile" ?
                                            (!isConnected ?
                                                    link.component :
                                                    <NavigationMenuLink
                                                        href={link.href}
                                                        className="block px-4 py-2 rounded-md hover:bg-gray-800 text-sm font-semibold"
                                                    >
                                                        {link.name}
                                                    </NavigationMenuLink>
                                            ) :
                                            <NavigationMenuLink
                                                href={link.href}
                                                className="block px-4 py-2 rounded-md hover:bg-gray-800 text-sm font-semibold"
                                            >
                                                {link.name}
                                            </NavigationMenuLink>
                                    )}
                                </NavigationMenuItem>
                            ))}
                            <NavigationMenuIndicator/>
                        </NavigationMenuList>
                        {/*<NavigationMenuViewport/>*/}
                    </NavigationMenu>
                </div>
                {isMenuOpen && (
                    <div className="md:hidden fixed z-50 top-0 left-0 right-0 bottom-0 h-screen w-full bg-image">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-white focus:outline-none absolute top-4 right-4"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                ></path>
                            </svg>
                        </button>
                        <nav className="flex flex-col items-center justify-center h-full text-white gap-4 p-4">
                            <Link href="/" className="flex items-center gap-2">
                                <Image src={soldotfunText} alt="Soldotfun" className="w-42" priority={true}/>
                            </Link>
                            {navLinks.map((link) => (
                                <div key={link.id} className="text-center flex flex-col items-center gap-2 relative">
                                    {link.subLinks ? (
                                        <Menubar>
                                            <MenubarMenu>
                                                <MenubarTrigger
                                                    className="px-4 py-2 cursor-pointer border-node bg-transparent hover:bg-gray-800 font-semibold">{link.name}</MenubarTrigger>
                                                <MenubarContent
                                                    className="bg-gradient-to-b from-cyan via-blue to-primary p-px">
                                                    <div
                                                        className="bg-gradient-to-b from-cyan via-blue to-primary p-px">
                                                        <div className="bg-background p-2 rounded-md">
                                                            {link.subLinks.map((subLink) => (
                                                                <MenubarItem key={subLink.id}>
                                                                    <Link href={subLink.href}
                                                                          className="block px-4 py-2 rounded-md hover:bg-gray-800"
                                                                    >
                                                                        {subLink.name}
                                                                    </Link>
                                                                </MenubarItem>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </MenubarContent>
                                            </MenubarMenu>
                                        </Menubar>
                                    ) : (
                                        link.name === "Profile" ?
                                            (!isConnected ?
                                                    link.component :
                                                    <Link
                                                        href={link.href}
                                                        className="block px-4 py-2 rounded-md hover:bg-gray-800 font-semibold"
                                                    >
                                                        {link.name}
                                                    </Link>
                                            ) :
                                            <Link
                                                href={link.href}
                                                className="block px-4 py-2 rounded-md hover:bg-gray-800 font-semibold"
                                            >
                                                {link.name}
                                            </Link>
                                    )}
                                </div>
                            ))}
                        </nav>
                    </div>
                )}
            </nav>
        </header>
    );
}

export default Header;