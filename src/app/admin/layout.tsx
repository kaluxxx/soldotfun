'use client';

import {NavigationMenu, NavigationMenuLink, NavigationMenuList} from "@/components/ui/navigation-menu";
import {ReactNode} from "react";
import {usePathname} from "next/navigation";

export default function DashboardLayout({
                                            children, // will be a page or nested layout
                                        }: {
    children: ReactNode
}) {
    const pathname = usePathname();
    const links = [
        {
            name: 'Dashboard',
            href: '/admin',
        },
        {
            name: 'Projects',
            href: '/admin/projects',
        },
        {
            name: 'users',
            href: '/admin/users',
        },
    ];

    return (
        <section className="p-8 py-2 w-full max-w-4xl">
            <div
                className="h-full w-full flex flex-col items-center justify-center bg-[#8686861a] rounded-xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border-none p-4">
                <NavigationMenu className="w-full flex flex-col items-center gap-4">
                    <NavigationMenuList className="flex justify-between gap-4">
                        {links.map((link, index) => (
                            <NavigationMenuLink
                                key={index}
                                href={link.href}
                                className={`block px-4 py-2 rounded-md hover:bg-gray-800 ${pathname === link.href ? 'bg-gray-800' : '' }`}
                            >
                                {link.name}
                            </NavigationMenuLink>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
                {children}
            </div>
        </section>
    )
}