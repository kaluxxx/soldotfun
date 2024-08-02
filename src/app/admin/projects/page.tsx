'use client';

import {ColumnDef} from "@tanstack/react-table";
import {Project} from "@/db/types/project-table";
import {Checkbox} from "@/components/ui/checkbox";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {DotsHorizontalIcon} from "@radix-ui/react-icons";
import ListView from "@/components/list-view";
import {useEffect, useState} from "react";
import {getProjects} from "@/app/actions/project";

const columns: ColumnDef<Project>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "ticker",
        header: "Ticker",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("ticker")}</div>
        ),
    },
    {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => (
            <Image src={row.getValue("image")} alt="Project image" width={50} height={50} className="rounded-full" />
        ),
    },
    {
        accessorKey: "user.username",
        header: "Dev",
        cell: ({ row }) => (
            <div className="capitalize">{row.original.user?.username}</div>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("status")}</div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const project = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <DotsHorizontalIcon className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([])

    useEffect(() => {
        const fetchProjects = async () => {
            const projects = await getProjects();

            if (!projects) return;

            setProjects(projects);
        }

        fetchProjects();
    }, []);

    return (
        <div className="w-full h-full p-4 flex flex-col justify-center items-center gap-4">
            <h1 className="text-2xl font-bold">Projects</h1>
            <p className="text-foreground">Manage your projects here</p>
            <ListView columns={columns} data={projects} />
        </div>
    );
}