"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Experience } from "@/lib/firebase-db"
import { Button } from "@/components/ui/button"
import { 
    ArrowUpDown, 
    Pencil, 
    Trash2,
    MoreHorizontal,
    Briefcase,
    Calendar,
} from "lucide-react"
import Link from "next/link"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteExperience } from "@/app/admin/actions"
import { useRouter } from "next/navigation"
import { useState } from "react"

export const columns: ColumnDef<Experience>[] = [
    {
        accessorKey: "role",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="-ml-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-transparent"
                >
                    Rôle / Titre
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const role = row.getValue("role") as string
            const current = row.original.current
            return (
                <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-800 dark:text-white/90">{role}</span>
                    {current && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500">
                            Actuel
                        </span>
                    )}
                </div>
            )
        }
    },
    {
        accessorKey: "company",
        header: "Entreprise / École",
        cell: ({ row }) => {
            const company = row.getValue("company") as string
            return (
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800">
                        <Briefcase className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{company}</span>
                </div>
            )
        }
    },
    {
        accessorKey: "date",
        header: "Période",
        cell: ({ row }) => {
            const date = row.getValue("date") as string
            return (
                <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                    <span className="text-gray-500 dark:text-gray-400">{date}</span>
                </div>
            )
        }
    },
    {
        accessorKey: "current",
        header: "Statut",
        cell: ({ row }) => {
            const current = row.getValue("current") as boolean
            return current ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500">
                    <div className="h-1.5 w-1.5 rounded-full bg-success-500 animate-pulse" />
                    En cours
                </span>
            ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-gray-400">
                    <div className="h-1.5 w-1.5 rounded-full bg-gray-400 dark:bg-gray-500" />
                    Terminé
                </span>
            )
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const experience = row.original
            const [isDeleting, setIsDeleting] = useState(false)
            const router = useRouter()

            const handleDelete = async () => {
                setIsDeleting(true)
                try {
                    await deleteExperience(experience.id)
                    router.refresh()
                } catch (error) {
                    console.error(error)
                } finally {
                    setIsDeleting(false)
                }
            }

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800"
                        >
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                        <DropdownMenuItem asChild className="text-gray-700 dark:text-gray-300 focus:bg-gray-100 dark:focus:bg-gray-800">
                            <Link href={`/admin/dashboard/experiences/${experience.id}/edit`}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Modifier
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-800" />
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <DropdownMenuItem 
                                    onSelect={(e) => e.preventDefault()} 
                                    className="text-error-600 dark:text-error-400 focus:bg-error-50 dark:focus:bg-error-500/10"
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Supprimer
                                </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                                <AlertDialogHeader>
                                    <AlertDialogTitle className="text-gray-800 dark:text-white/90">Êtes-vous sûr ?</AlertDialogTitle>
                                    <AlertDialogDescription className="text-gray-500 dark:text-gray-400">
                                        L&apos;expérience <span className="font-medium text-gray-800 dark:text-white/90">&quot;{experience.role}&quot;</span> chez <span className="font-medium text-gray-800 dark:text-white/90">{experience.company}</span> sera définitivement supprimée.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel className="bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                                        Annuler
                                    </AlertDialogCancel>
                                    <AlertDialogAction 
                                        onClick={handleDelete}
                                        className="bg-error-500 hover:bg-error-600 text-white"
                                        disabled={isDeleting}
                                    >
                                        {isDeleting ? "Suppression..." : "Supprimer"}
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
