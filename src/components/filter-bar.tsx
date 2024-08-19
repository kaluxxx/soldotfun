import filterIcon from '../assets/images/filter.png';
import Image from "next/image";
import {Badge} from "@/components/ui/badge";

interface FilterBarProps {
    onFilterChange: (filter: string) => void;
    selectedFilter: string;
}

export default function FilterBar({onFilterChange, selectedFilter}: FilterBarProps) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4">
            <div>
                <Image src={filterIcon} alt="Filter" className="w-6 h-6"/>
            </div>
            <Badge
                variant="secondary"
                className={`text-xl flex items-center gap-2 cursor-pointer ${selectedFilter === "Not started" ? "bg-white text-black" : ""}`}
                onClick={() => onFilterChange("Not started")}>
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
            <Badge
                variant="default"
                className={`text-xl flex items-center gap-2 cursor-pointer ${selectedFilter === "Live" ? "bg-green-500 text-white" : ""}`}
                onClick={() => onFilterChange("Live")}
            >
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
        </div>
    )
}