"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Skill } from "@/lib/firebase-db"
import { Button } from "@/components/ui/button"
import { 
    ArrowUpDown, 
    Pencil, 
    Trash2,
    MoreHorizontal,
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
import { deleteSkill } from "@/app/admin/actions"
import { useRouter } from "next/navigation"
import { useState } from "react"

const categoryColors: Record<string, string> = {
    frontend: "bg-blue-light-50 text-blue-light-500 dark:bg-blue-light-500/15 dark:text-blue-light-500",
    backend: "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500",
    devops: "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-orange-400",
    database: "bg-brand-50 text-brand-500 dark:bg-brand-500/15 dark:text-brand-400",
    ai: "bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500",
    design: "bg-orange-50 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400",
    other: "bg-gray-100 text-gray-700 dark:bg-white/5 dark:text-white/80",
}

export const columns: ColumnDef<Skill>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="-ml-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-transparent"
                >
                    Nom
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const name = row.getValue("name") as string
            const color = row.original.color
            return (
                <div className="flex items-center gap-3">
                    {color && (
                        <div 
                            className="h-4 w-4 rounded-full ring-2 ring-white dark:ring-gray-900 shadow-sm"
                            style={{ backgroundColor: color }}
                        />
                    )}
                    <span className="font-medium text-gray-800 dark:text-white/90">{name}</span>
                </div>
            )
        }
    },
    {
        accessorKey: "category",
        header: "Catégorie",
        cell: ({ row }) => {
            const category = row.getValue("category") as string
            const colors = categoryColors[category.toLowerCase()] || categoryColors.other
            return (
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${colors}`}>
                    {category}
                </span>
            )
        }
    },
    {
        accessorKey: "level",
        header: "Niveau",
        cell: ({ row }) => {
            const level = row.getValue("level") as number
            return (
                <div className="w-32">
                    <div className="flex justify-between text-xs mb-1.5">
                        <span className="font-medium text-gray-800 dark:text-white/90">{level}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-brand-500 rounded-full transition-all"
                            style={{ width: `${level}%` }}
                        />
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: "icon",
        header: "Icône",
        cell: ({ row }) => {
            const icon = row.getValue("icon") as string | null
            return icon ? (
                <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-xs font-mono">
                    {icon}
                </code>
            ) : (
                <span className="text-gray-400 dark:text-gray-500 text-sm">—</span>
            )
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const skill = row.original
            const [isDeleting, setIsDeleting] = useState(false)
            const router = useRouter()

            const handleDelete = async () => {
                setIsDeleting(true)
                try {
                    await deleteSkill(skill.id)
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
                            <Link href={`/admin/dashboard/skills/${skill.id}/edit`}>
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
                                        La compétence <span className="font-medium text-gray-800 dark:text-white/90">&quot;{skill.name}&quot;</span> sera définitivement supprimée.
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
