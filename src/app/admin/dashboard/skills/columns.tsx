"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Skill } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Pencil, Trash } from "lucide-react"
import Link from "next/link"

export const columns: ColumnDef<Skill>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nom
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "category",
        header: "Catégorie",
    },
    {
        accessorKey: "icon",
        header: "Icône",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const skill = row.original

            return (
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={`/admin/dashboard/skills/${skill.id}/edit`}>
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
