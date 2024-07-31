'use client';
import {useState, useEffect, useRef} from "react";
import Image from "next/image";
import soldotfun from "../assets/images/soldotfun.png";
import soldotfunText from "../assets/images/soldotfun-text.png";
import Link from "next/link";
import {
    NavigationMenu, NavigationMenuContent, NavigationMenuIndicator,
    NavigationMenuItem, NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger, NavigationMenuViewport
} from "@/components/ui/navigation-menu";
import WalletConnection from "@/components/wallet-connection";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu, MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger
} from "@/components/ui/menubar";

function Header() {
    const [isConnected, setIsConnected] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);
    const subMenuRef = useRef<HTMLDivElement | null>(null);

    const serviceLinks = [
        {id: 1, name: "Web site development", href: "/web-site-development"},
        {id: 2, name: "Graphic design", href: "/graphic-design"},
        {id: 3, name: "Marketing", href: "/marketing"},
    ];

    const socialLinks = [
        {id: 1, name: "Twitter", href: "https://twitter.com/soldotfun"},
        {id: 2, name: "Telegram", href: "https://t.me/soldotfun"},
    ];

    const navLinks = [
        {id: 1, name: "Launchpad", href: "/"},
        {id: 3, name: "Services", href: "/services", subLinks: serviceLinks},
        {id: 4, name: "Socials", href: "/socials", subLinks: socialLinks},
        {id: 5, name: "Profile", href: "/profile", component: <WalletConnection/>},
        {id: 6, name: "Settings", href: "/settings"},
    ];

    const toggleSubMenu = (id: number) => {
        setOpenSubMenu(openSubMenu === id ? null : id);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (subMenuRef.current && !subMenuRef.current.contains(event.target as Node)) {
            setOpenSubMenu(null);
        }
    };

    useEffect(() => {
        if (isMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <header className="w-full relative">
            <nav className="flex justify-between items-center w-full px-4 py-2 bg-transparent">
                <Link href="/" className="flex items-center gap-2">
                    <Image src={soldotfun} alt="Soldotfun" className="w-24"/>
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
                                                <MenubarTrigger className="cursor-pointer border-node bg-transparent">{link.name}</MenubarTrigger>
                                                <MenubarContent
                                                    className="bg-gradient-to-b from-cyan via-blue to-primary p-px">
                                                    <div
                                                        className="bg-gradient-to-b from-cyan via-blue to-primary p-px">
                                                        <div className="bg-background p-2 rounded-md">
                                                            {link.subLinks.map((subLink) => (
                                                                <MenubarItem key={subLink.id}>
                                                                    <Link href={subLink.href}
                                                                          className="block px-4 py-2 rounded-md hover:bg-gray-800">
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
                                                        className="block px-4 py-2 rounded-md hover:bg-gray-800"
                                                    >
                                                        {link.name}
                                                    </NavigationMenuLink>
                                            ) :
                                            <NavigationMenuLink
                                                href={link.href}
                                                className="block px-4 py-2 rounded-md hover:bg-gray-800"
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
                                <Image src={soldotfunText} alt="Soldotfun" className="w-42"/>
                            </Link>
                            {navLinks.map((link) => (
                                <div key={link.id} className="text-center flex flex-col items-center gap-2 relative"
                                     ref={subMenuRef}>
                                    {link.subLinks ? (
                                        <>
                                            <button onClick={() => toggleSubMenu(link.id)}
                                                    className="text-xl text-center flex items-center justify-between px-4 py-2 gap-2 rounded-md hover:bg-gray-800">
                                                {link.name}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                     viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2"
                                                     stroke-linecap="round" stroke-linejoin="round"
                                                     className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-down">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                    <path d="M6 9l6 6l6 -6"/>
                                                </svg>
                                            </button>
                                            {openSubMenu === link.id && (
                                                <div
                                                    className="absolute left-0 top-12 rounded-md shadow-md z-50 bg-gradient-to-b from-cyan via-blue to-primary p-px">

                                                    <div
                                                        className="rounded-md shadow-md z-50 bg-gradient-to-b from-cyan via-blue to-primary p-px">
                                                        <ul className="bg-background rounded-md py-2 px-4 w-full">
                                                            {link.subLinks.map((subLink) => (
                                                                <li key={subLink.id}>
                                                                    <Link href={subLink.href}
                                                                          className="w-full text-left block px-4 py-2 rounded-md hover:bg-gray-800">
                                                                        {subLink.name}
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <Link href={link.href} className="text-xl">
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