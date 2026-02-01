"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Project } from "@/lib/firebase-db"
import { Button } from "@/components/ui/button"
import { 
    ArrowUpDown, 
    Pencil, 
    Trash2,
    Star,
    MoreHorizontal,
    Image as ImageIcon,
    Github,
    Globe
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
import { deleteProject } from "@/app/admin/actions"
import { useRouter } from "next/navigation"
import { useState } from "react"

const categoryColors: Record<string, string> = {
    frontend: "bg-blue-light-50 text-blue-light-500 dark:bg-blue-light-500/15 dark:text-blue-light-500",
    backend: "bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500",
    fullstack: "bg-brand-50 text-brand-500 dark:bg-brand-500/15 dark:text-brand-400",
    devops: "bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-orange-400",
}

export const columns: ColumnDef<Project>[] = [
    {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => {
            const image = row.getValue("image") as string
            return (
                <div className="h-12 w-20 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    {image ? (
                        <Image 
                            src={image} 
                            alt="" 
                            width={80} 
                            height={48} 
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <ImageIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
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
                    <span className="font-medium text-gray-800 dark:text-white/90">{title}</span>
                    {featured && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-orange-400">
                            <Star className="h-3 w-3 fill-current" />
                            À la une
                        </span>
                    )}
                </div>
            )
        },
    },
    {
        accessorKey: "category",
        header: "Catégorie",
        cell: ({ row }) => {
            const category = row.getValue("category") as string
            const colors = categoryColors[category.toLowerCase()] || "bg-gray-100 text-gray-700 dark:bg-white/5 dark:text-white/80"
            return (
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${colors}`}>
                    {category}
                </span>
            )
        },
    },
    {
        accessorKey: "tags",
        header: "Technologies",
        cell: ({ row }) => {
            const tags = row.getValue("tags") as string
            try {
                const parsed = JSON.parse(tags)
                if (Array.isArray(parsed)) {
                    return (
                        <div className="flex gap-1.5 flex-wrap max-w-[200px]">
                            {parsed.slice(0, 3).map((tag: string) => (
                                <span 
                                    key={tag} 
                                    className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-700 dark:bg-white/5 dark:text-white/80"
                                >
                                    {tag}
                                </span>
                            ))}
                            {parsed.length > 3 && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-500 dark:bg-white/5 dark:text-gray-400">
                                    +{parsed.length - 3}
                                </span>
                            )}
                        </div>
                    )
                }
                return <span className="text-gray-500 dark:text-gray-400 text-sm">{tags}</span>
            } catch {
                return <span className="text-gray-500 dark:text-gray-400 text-sm">{tags}</span>
            }
        }
    },
    {
        accessorKey: "link",
        header: "Liens",
        cell: ({ row }) => {
            const link = row.getValue("link") as string
            const github = row.original.github as string
            return (
                <div className="flex items-center gap-1">
                    {link && (
                        <a 
                            href={link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center h-8 w-8 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 transition-colors"
                        >
                            <Globe className="h-4 w-4" />
                        </a>
                    )}
                    {github && (
                        <a 
                            href={github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center h-8 w-8 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 transition-colors"
                        >
                            <Github className="h-4 w-4" />
                        </a>
                    )}
                </div>
            )
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const project = row.original
            const [isDeleting, setIsDeleting] = useState(false)
            const router = useRouter()

            const handleDelete = async () => {
                setIsDeleting(true)
                try {
                    await deleteProject(project.id)
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
                            <Link href={`/admin/dashboard/projects/${project.id}/edit`}>
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
                                    <AlertDialogTitle className="flex items-center gap-2 text-error-600 dark:text-error-400">
                                        <Trash2 className="h-5 w-5" />
                                        Êtes-vous sûr ?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription className="text-gray-500 dark:text-gray-400">
                                        Le projet <span className="font-medium text-gray-800 dark:text-white/90">&quot;{project.title}&quot;</span> sera définitivement supprimé.
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
