import {ColumnDef} from "@tanstack/react-table";
import {Project} from "@/db/types/project-table";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {ArrowUpDown} from "lucide-react";
import Image from "next/image";
import {Badge} from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {DotsHorizontalIcon} from "@radix-ui/react-icons";

export const columns = (handleDelete: (projectId: number) => void, handleEdit: (projectId: number) => void): ColumnDef<Project>[] => [
    {
        id: "select",
        header: ({table}) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({row}) => (
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
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    className="hover:bg-transparent p-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => (
            <div className="capitalize">{row.getValue("name")}</div>
        ),
    },
    {
        accessorKey: "ticker",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    className="hover:bg-transparent p-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Ticker
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => (
            <div className="capitalize">{row.getValue("ticker")}</div>
        ),
    },
    {
        accessorKey: "image",
        header: "Image",
        cell: ({row}) => (
            <Image src={row.getValue("image")} alt="Project image" width={50} height={50} className="rounded-full"/>
        ),
    },
    {
        id: "Dev",
        accessorKey: "user.username",
        accessorFn: (project) => project.user?.username,
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    className="hover:bg-transparent p-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Dev
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => (
            <div className="capitalize">{row.original.user?.username}</div>
        ),
    },
    {
        accessorKey: "status",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    className="hover:bg-transparent p-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({row}) => (
            <div className="capitalize">
                <Badge variant={row.original.status === "live" ? "default" : "secondary"}>{row.original.status}</Badge>
            </div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({row}) => {
            const project = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <DotsHorizontalIcon className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Show</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(project.id)}>
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(project.id)}>
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]