"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Experience } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Pencil, Trash } from "lucide-react"
import Link from "next/link"

export const columns: ColumnDef<Experience>[] = [
    {
        accessorKey: "role",
        header: "Rôle",
    },
    {
        accessorKey: "company",
        header: "Entreprise",
    },
    {
        accessorKey: "date",
        header: "Date",
    },
    {
        accessorKey: "current",
        header: "Actuel",
        cell: ({ row }) => row.original.current ? "Oui" : "Non",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const exp = row.original

            return (
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href={`/admin/dashboard/experiences/${exp.id}/edit`}>
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
