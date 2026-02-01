"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Article } from "@/lib/firebase-db"
import { Button } from "@/components/ui/button"
import { 
    ArrowUpDown, 
    Pencil, 
    Trash2,
    Eye,
    Star,
    MoreHorizontal,
    Image as ImageIcon,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
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
import { deleteArticle } from "@/app/admin/actions"
import { useRouter } from "next/navigation"
import { useState } from "react"

export const columns: ColumnDef<Article>[] = [
    {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => {
            const image = row.getValue("image") as string
            return (
                <div className="h-10 w-14 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    {image ? (
                        <Image 
                            src={image} 
                            alt="" 
                            width={56} 
                            height={40} 
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <ImageIcon className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                    )}
                </div>
            )
        },
    },
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="-ml-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-transparent"
                >
                    Titre
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const title = row.getValue("title") as string
            const featured = row.original.featured
            return (
                <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-800 dark:text-white/90 max-w-[200px] truncate" title={title}>{title}</span>
                    {featured && (
                        <Star className="h-4 w-4 fill-warning-400 text-warning-400" />
                    )}
                </div>
            )
        }
    },
    {
        accessorKey: "category",
        header: "Catégorie",
        cell: ({ row }) => {
            const category = row.getValue("category") as string
            return (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-white/5 dark:text-white/80 capitalize">
                    {category}
                </span>
            )
        }
    },
    {
        accessorKey: "author",
        header: "Auteur",
        cell: ({ row }) => {
            const author = row.getValue("author") as string
            return <span className="text-sm text-gray-500 dark:text-gray-400">{author}</span>
        }
    },
    {
        accessorKey: "published",
        header: "Statut",
        cell: ({ row }) => {
            const published = row.getValue("published") as boolean
            return published ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500">
                    <div className="h-1.5 w-1.5 rounded-full bg-success-500" />
                    Publié
                </span>
            ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-orange-400">
                    <div className="h-1.5 w-1.5 rounded-full bg-warning-500" />
                    Brouillon
                </span>
            )
        }
    },
    {
        accessorKey: "views",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="-ml-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-transparent"
                >
                    Vues
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const views = row.getValue("views") as number
            return (
                <div className="flex items-center gap-1.5">
                    <Eye className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                    <span className="text-sm font-medium text-gray-800 dark:text-white/90">{views || 0}</span>
                </div>
            )
        }
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="-ml-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-transparent"
                >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const date = row.getValue("createdAt") as Date
            return (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(date).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                    })}
                </span>
            )
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const article = row.original
            const [isDeleting, setIsDeleting] = useState(false)
            const router = useRouter()

            const handleDelete = async () => {
                setIsDeleting(true)
                try {
                    await deleteArticle(article.id)
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
                            <Link href={`/admin/dashboard/articles/${article.id}/edit`}>
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
                                        L&apos;article <span className="font-medium text-gray-800 dark:text-white/90">&quot;{article.title}&quot;</span> sera définitivement supprimé.
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
