'use client';

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import SearchBar from "@/components/search-bar";
import soldotfunLaunchpad from "../assets/images/soldotfun-launchpad.png"
import tokenImage from "../assets/images/tokenImage.png"
import cabal from "../assets/images/cabal.jpg"

import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Badge} from "@/components/ui/badge";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import { useState} from "react";
import FilterBar from "@/components/filter-bar";

import DATA from "@/data/data.json";

const ITEMS_PER_PAGE = 9;

export default function Home() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("All");

    const totalPages = Math.ceil(DATA.length / ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) {
            return;
        }
        setCurrentPage(page);
    };

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
        setCurrentPage(1); // Reset to first page on search
    };

    const handleFilterChange = (filter: string) => {
        if (selectedFilter === filter) {
            setSelectedFilter("All");
            return;
        }
        setSelectedFilter(filter);
        setCurrentPage(1); // Reset to first page on filter change
    };

    const filteredData = DATA.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedFilter === "All" || item.status === selectedFilter)
    );

    const paginatedData = filteredData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );


    return (
        <section className="flex-1 flex flex-col items-center h-full w-full p-8 py-2 gap-4">
            <h1 className="w-full md:w-1/2 mx-auto">
                <Image src={soldotfunLaunchpad} alt="Soldotfun Launchpad" className="w-2/3 mx-auto h-auto"/>
            </h1>
            <SearchBar onSearchChange={handleSearchChange}/>
            <FilterBar selectedFilter={selectedFilter} onFilterChange={handleFilterChange}/>
            <section className="flex-1">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {paginatedData.map((item, index) => (
                        <Card key={index}
                              className="h-full w-full flex flex-col justify-between bg-[#8686861a] rounded-xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border-none">
                            <CardHeader className="flex-1">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center rounded-full bg-primary/10 p-2">
                                        <Image src={tokenImage} alt="Token Image" className="w-24 h-24 rounded-full"/>
                                    </div>
                                    <div>
                                        {item.status === "Not started" && (
                                            <Badge
                                                className="text-xl flex items-center gap-2 border border-white bg-white/10 text-white hover:bg-transparent cursor-pointer">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                     viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2"
                                                     strokeLinecap="round" strokeLinejoin="round"
                                                     className="icon icon-tabler icons-tabler-outline icon-tabler-clock">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                    <circle cx="12" cy="12" r="9"/>
                                                    <polyline points="12 7 12 12 15 15"/>
                                                </svg>
                                                <span>Incoming</span>
                                            </Badge>
                                        )}
                                        {item.status === "Live" && (
                                            <Badge
                                                className="text-xl flex items-center gap-2 border border-green-500 bg-green-500/10 text-green-500 hover:bg-transparent cursor-pointer">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                     viewBox="0 0 24 24" fill="none" stroke="#1cc88a" strokeWidth="2"
                                                     strokeLinecap="round" strokeLinejoin="round"
                                                     className="icon icon-tabler icons-tabler-outline icon-tabler-clock">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                    <circle cx="12" cy="12" r="9"/>
                                                    <polyline points="12 7 12 12 15 15"/>
                                                </svg>
                                                <span>Live</span>
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                                <CardTitle>{item.name}/{item.ticker}</CardTitle>
                                <CardDescription>
                                    {item.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center">
                                        <p>Initial Supply</p>
                                        <p>{item.initialSupply}</p>
                                    </div>
                                    <div className="text-center">
                                        <p>Initial Price</p>
                                        <p>{item.initialPrice}</p>
                                    </div>
                                    <div
                                        className="col-start-1 col-span-2 md:col-start-3 md:col-span-1 text-center">
                                        <p>Initial Market Cap</p>
                                        <p>{item.initialMarketCap}</p>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col md:flex-row justify-between items-center gap-4">
                                <div className="bg-gradient-to-b from-cyan via-blue to-primary rounded-full p-px">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger
                                            className="bg-gradient-to-b from-cyan via-blue to-primary rounded-full p-px outline-none">
                                            <div
                                                className="rounded-full hover:bg-background bg-gradient-to-b from-cyan via-blue to-primary hover:from-transparent hover:via-transparent hover:to-transparent flex items-center gap-2 py-2 px-4">
                                                Marketing By
                                            </div>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            className="bg-gradient-to-b from-cyan via-blue to-primary p-px">
                                            <div className="p-2 shadow-md rounded-md bg-background">
                                                <DropdownMenuItem>
                                                    <Link href="https://t.me/+V3A60G1Evp1iNGZk"
                                                          className="flex items-center gap-2 cursor-pointer">
                                                <span>
                                                    <Image src={cabal} alt="Cabal" className="w-8 h-8 rounded-full"/>
                                                </span>
                                                        <span>
                                                    Pumpfun cabal
                                                </span>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Link href="https://t.me/+V3A60G1Evp1iNGZk"
                                                          className="flex items-center gap-2 cursor-pointer">
                                                <span>
                                                    <Image src={cabal} alt="Cabal" className="w-8 h-8 rounded-full"/>
                                                </span>
                                                        <span>
                                                    Pumpfun cabal
                                                </span>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Link href="https://t.me/+V3A60G1Evp1iNGZk"
                                                          className="flex items-center gap-2 cursor-pointer">
                                                <span>
                                                    <Image src={cabal} alt="Cabal" className="w-8 h-8 rounded-full"/>
                                                </span>
                                                        <span>
                                                    Pumpfun cabal
                                                </span>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator/>
                                                <DropdownMenuItem className="flex items-center gap-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                         viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                         strokeWidth="2"
                                                         strokeLinecap="round" strokeLinejoin="round"
                                                         className="icon icon-tabler icons-tabler-outline icon-tabler-plus">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                        <path d="M12 5l0 14"/>
                                                        <path d="M5 12l14 0"/>
                                                    </svg>
                                                    Add More
                                                </DropdownMenuItem>
                                            </div>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <div className="bg-gradient-to-b from-cyan via-blue to-primary rounded-full p-px">
                                    <Dialog>
                                        <DialogTrigger
                                            className="bg-gradient-to-b from-cyan via-blue to-primary rounded-full p-px">
                                            <div
                                                className="rounded-full bg-background hover:bg-gradient-to-b from-cyan via-blue to-primary flex items-center gap-2  py-2 px-4">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                     viewBox="0 0 24 24"
                                                     fill="none" stroke="currentColor" strokeWidth="2"
                                                     strokeLinecap="round"
                                                     strokeLinejoin="round"
                                                     className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-right">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                    <path d="M5 12l14 0"/>
                                                    <path d="M13 18l6 -6"/>
                                                    <path d="M13 6l6 6"/>
                                                </svg>
                                                View details
                                            </div>
                                        </DialogTrigger>
                                        <DialogContent
                                            className="bg-gradient-to-b from-cyan via-blue to-primary p-px">
                                            <div
                                                className="p-8 shadow-md rounded-md bg-background flex flex-col gap-4">
                                                <DialogHeader className="flex flex-col md:flex-row items-center gap-2">
                                                    <div
                                                        className="flex justify-start items-start self-start rounded-full bg-primary/10 p-2 mx-auto">
                                                        <Image src={tokenImage} alt="Token Image"
                                                               className="w-24 h-24 rounded-full self-start"/>

                                                    </div>
                                                    <div className="flex-1 flex flex-col gap-4">
                                                        <DialogTitle
                                                            className="text-xl text-center">Neiro</DialogTitle>
                                                        <DialogDescription>
                                                            Neiro is a meme token that is used for tipping content
                                                            creators
                                                            on the internet. It is based on the Solana chain.
                                                        </DialogDescription>
                                                        <div className="flex items-center justify-center gap-2">
                                                            <div
                                                                className="bg-gradient-to-b from-cyan via-blue to-primary rounded-full p-px">
                                                                <Link href="https://t.me/+V3A60G1Evp1iNGZk"
                                                                      className="rounded-full bg-background hover:bg-gradient-to-b from-cyan via-blue to-primary h-10 w-10 flex items-center justify-center">
                                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                                         width="24"
                                                                         height="24"
                                                                         viewBox="0 0 24 24"
                                                                         stroke="currentColor" strokeWidth="2"
                                                                         strokeLinecap="round"
                                                                         strokeLinejoin="round"
                                                                         className="icon icon-tabler icons-tabler-outline icon-tabler-brand-x">
                                                                        <path stroke="none" d="M0 0h24v24H0z"
                                                                              fill="none"/>
                                                                        <path
                                                                            d="M4 4l11.733 16h4.267l-11.733 -16z"/>
                                                                        <path
                                                                            d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/>
                                                                    </svg>
                                                                </Link>
                                                            </div>
                                                            <div
                                                                className="bg-gradient-to-b from-cyan via-blue to-primary rounded-full p-px">
                                                                <Link href="https://t.me/+V3A60G1Evp1iNGZk"
                                                                      className="rounded-full bg-background hover:bg-gradient-to-b from-cyan via-blue to-primary h-10 w-10 flex items-center justify-center">
                                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                                         width="24"
                                                                         height="24" viewBox="0 0 24 24" fill="none"
                                                                         stroke="currentColor" strokeWidth="2"
                                                                         strokeLinecap="round"
                                                                         strokeLinejoin="round"
                                                                         className="icon icon-tabler icons-tabler-outline icon-tabler-brand-telegram">
                                                                        <path stroke="none" d="M0 0h24v24H0z"
                                                                              fill="none"/>
                                                                        <path
                                                                            d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4"/>
                                                                    </svg>
                                                                </Link>
                                                            </div>
                                                            <div
                                                                className="bg-gradient-to-b from-cyan via-blue to-primary rounded-full p-px">
                                                                <Link href="https://t.me/+V3A60G1Evp1iNGZk"
                                                                      className="rounded-full bg-background hover:bg-gradient-to-b from-cyan via-blue to-primary h-10 w-10 flex items-center justify-center">
                                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                                         width="24"
                                                                         height="24" viewBox="0 0 24 24" fill="none"
                                                                         stroke="currentColor" strokeWidth="2"
                                                                         strokeLinecap="round"
                                                                         strokeLinejoin="round"
                                                                         className="icon icon-tabler icons-tabler-outline icon-tabler-world-www">
                                                                        <path stroke="none" d="M0 0h24v24H0z"
                                                                              fill="none"/>
                                                                        <path
                                                                            d="M19.5 7a9 9 0 0 0 -7.5 -4a8.991 8.991 0 0 0 -7.484 4"/>
                                                                        <path
                                                                            d="M11.5 3a16.989 16.989 0 0 0 -1.826 4"/>
                                                                        <path
                                                                            d="M12.5 3a16.989 16.989 0 0 1 1.828 4"/>
                                                                        <path
                                                                            d="M19.5 17a9 9 0 0 1 -7.5 4a8.991 8.991 0 0 1 -7.484 -4"/>
                                                                        <path
                                                                            d="M11.5 21a16.989 16.989 0 0 1 -1.826 -4"/>
                                                                        <path
                                                                            d="M12.5 21a16.989 16.989 0 0 0 1.828 -4"/>
                                                                        <path d="M2 10l1 4l1.5 -4l1.5 4l1 -4"/>
                                                                        <path d="M17 10l1 4l1.5 -4l1.5 4l1 -4"/>
                                                                        <path d="M9.5 10l1 4l1.5 -4l1.5 4l1 -4"/>
                                                                    </svg>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </DialogHeader>
                                                <div className="flex flex-col justify-between gap-4">
                                                    <h2 className="text-xl text-center">Project financials</h2>
                                                    <div className="flex justify-between">
                                                        <div className="flex flex-col items-center gap-2">
                                                            <p>Initial Supply</p>
                                                            <p className="text-sm">1,000,000,000</p>
                                                        </div>
                                                        <div className="flex flex-col items-center gap-2">
                                                            <p>Initial Price</p>
                                                            <p className="text-sm">0.0001$</p>
                                                        </div>
                                                        <div className="flex flex-col items-center gap-2">
                                                            <p>Initial Market Cap</p>
                                                            <p className="text-sm">4k5</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col justify-between gap-4">
                                                    <h2 className="text-xl text-center">Project status</h2>
                                                    <div
                                                        className="flex  flex-col items-center justify-center gap-4">
                                                        <div
                                                            className="bg-gradient-to-b from-cyan via-blue to-primary rounded-full p-px flex items-center gap-2">
                                                            <Badge className="bg-background text-white">
                                                                <span>Pre-sale</span>
                                                            </Badge>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span>Starts in</span>
                                                            <span>5 days</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </section>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" onClick={() => handlePageChange(currentPage - 1)}/>
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink href="#"
                                            onClick={() => handlePageChange(index + 1)}>{index + 1}</PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext href="#" onClick={() => handlePageChange(currentPage + 1)}/>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </section>
    );
}
