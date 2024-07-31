"use client";

import {CustomFlowbiteTheme, Sidebar} from "flowbite-react";
import { HiUser } from "react-icons/hi";
import { SiWorkplace } from "react-icons/si";
import { SiLaunchpad } from "react-icons/si";
import { FaXTwitter, FaTelegram } from "react-icons/fa6";
import { SiGoogledocs } from "react-icons/si";
import { TbWorldHeart } from "react-icons/tb";
import { MdOutlineDesignServices } from "react-icons/md";
import { MdOutlineCampaign } from "react-icons/md";
import {Separator} from "@/components/ui/separator";

const sidebarTheme: CustomFlowbiteTheme["sidebar"] = {
    "root": {
        "base": "hidden md:block fixed top-[65px] left-0 bottom-0 z-40 w-64 transition-transform -translate-x-full sm:translate-x-0",
        "collapsed": {
            "on": "w-16",
            "off": "w-64"
        },
        "inner": "h-full flex flex-col gap-4 justify-between px-3 py-4 bg-gradient-to-b  from-secondary via-primary to-primary-accent"
    },
    "collapse": {
        "button": "group flex w-full items-center rounded-lg p-2 text-base font-medium text-white transition duration-75 hover:bg-gray-100 hover:text-gray-900",
        "icon": {
            "base": "h-6 w-6 text-white transition duration-75 group-hover:text-gray-900",
            "open": {
                "off": "",
                "on": ""
            }
        },
        "label": {
            "base": "ml-3 flex-1 whitespace-nowrap text-left",
            "icon": {
                "base": "h-6 w-6 transition delay-0 ease-in-out",
                "open": {
                    "on": "rotate-180",
                    "off": ""
                }
            }
        },
        "list": "space-y-2 py-2"
    },
    "cta": {
        "base": "mt-6 rounded-lg bg-gray-100 p-4 dark:bg-gray-700",
        "color": {
            "blue": "bg-cyan-50 dark:bg-cyan-900",
            "dark": "bg-dark-50 dark:bg-dark-900",
            "failure": "bg-red-50 dark:bg-red-900",
            "gray": "bg-alternative-50 dark:bg-alternative-900",
            "green": "bg-green-50 dark:bg-green-900",
            "light": "bg-light-50 dark:bg-light-900",
            "red": "bg-red-50 dark:bg-red-900",
            "purple": "bg-purple-50 dark:bg-purple-900",
            "success": "bg-green-50 dark:bg-green-900",
            "yellow": "bg-yellow-50 dark:bg-yellow-900",
            "warning": "bg-yellow-50 dark:bg-yellow-900"
        }
    },
    "item": {
        "base": "flex rounded-lg p-2 text-base font-medium text-white transition duration-75 hover:bg-gray-100 hover:text-gray-900 group",
        "active": "bg-gray-100 dark:bg-gray-700",
        "collapsed": {
            "insideCollapse": "group w-full pl-8 transition duration-75",
            "noIcon": "font-bold"
        },
        "content": {
            "base": "flex-1 whitespace-nowrap px-3"
        },
        "icon": {
            "base": "h-6 w-6 flex-shrink-0 text-white transition duration-75 group-hover:text-gray-900",
            "active": "text-gray-700 dark:text-gray-100"
        },
        "label": "",
        "listItem": ""
    },
    "items": {
        "base": ""
    },
    "itemGroup": {
        "base": "mt-4 space-y-2 border-t border-gray-200 pt-4 first:mt-0 first:border-t-0 first:pt-0 dark:border-gray-700"
    },
    "logo": {
        "base": "mb-5 flex items-center pl-2.5",
        "collapsed": {
            "on": "hidden",
            "off": "self-center whitespace-nowrap text-xl font-semibold dark:text-white"
        },
        "img": "mr-3 h-6 sm:h-7"
    }
};

const SidebarComponent = () => {
    return (
        <Sidebar theme={sidebarTheme}>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Sidebar.Item href="#" icon={SiLaunchpad}>
                        Launchpad
                    </Sidebar.Item>
                    <Sidebar.Collapse icon={SiWorkplace} label="Hire place">
                        <Sidebar.Item href="#" icon={TbWorldHeart}>
                            Website development
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={MdOutlineDesignServices}>
                            Graphic design
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={MdOutlineCampaign}>
                            Marketing
                        </Sidebar.Item>
                    </Sidebar.Collapse>
                    <Sidebar.Item href="#" icon={HiUser}>
                        Profile
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Separator className="mb-4 border-t border-gray-200"/>
                    <Sidebar.Item href="#" icon={FaTelegram}>
                        Telegram
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={FaXTwitter}>
                        Twitter
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={SiGoogledocs}>
                        Docs
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}

// export name Sidebar from SidebarComponent
export { SidebarComponent as Sidebar };