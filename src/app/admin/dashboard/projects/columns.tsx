"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Project } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal, Pencil, Trash } from "lucide-react"
import Link from "next/link"

// This type is used to define the shape of our data.
export const columns: ColumnDef<Project>[] = [
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Titre
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => {
            const description = row.getValue("description") as string;
            return <div className="truncate max-w-[300px]" title={description}>{description}</div>
        }
    },
    {
        accessorKey: "tags",
        header: "Tags",
        cell: ({ row }) => {
            const tags = row.getValue("tags") as string;
            // Assuming tags is a JSON string of array
            try {
                const parsed = JSON.parse(tags);
                if (Array.isArray(parsed)) {
                    return (
                        <div className="flex gap-1 flex-wrap">
                            {parsed.slice(0, 3).map((tag: string) => (
                                <span key={tag} className="px-2 py-0.5 bg-secondary text-secondary-foreground rounded text-xs">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )
                }
                return tags;
            } catch (e) {
                return tags;
            }
        }
    },
    {
        accessorKey: "featured",
        header: "A la une",
        cell: ({ row }) => (
            <div className={row.getValue("featured") ? "text-green-500 font-bold" : "text-muted-foreground"}>
                {row.getValue("featured") ? "OUI" : "NON"}
            </div>
        )
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const project = row.original

            return (
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={`/admin/dashboard/projects/${project.id}/edit`}>
                            <Pencil className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600">
                        <Trash className="h-4 w-4" />
                    </Button>
                </div>
            )
        },
    },
]
