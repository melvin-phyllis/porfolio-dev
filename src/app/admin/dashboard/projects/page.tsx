import { getProjects } from "@/lib/firebase-db"
import { columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import Link from "next/link"
import { Plus, FolderGit2, Star, Layers } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function ProjectsPage() {
    const data = await getProjects()

    const featuredCount = data.filter(p => p.featured).length
    const categoriesCount = new Set(data.map(p => p.category)).size

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Projets</h1>
                    <p className="text-gray-500 dark:text-neutral-400 mt-1">Gérez vos projets portfolio</p>
                </div>
                <Link
                    href="/admin/dashboard/projects/new"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-black text-sm font-medium hover:bg-gray-800 dark:hover:bg-neutral-200 transition-colors"
                >
                    <Plus className="h-4 w-4" />
                    Nouveau projet
                </Link>
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-3">
                <div className="p-5 rounded-xl bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#1f1f1f]">
                    <div className="flex items-center justify-between mb-3">
                        <div className="p-2 rounded-lg bg-gray-100 dark:bg-[#1a1a1a]">
                            <FolderGit2 className="h-4 w-4 text-gray-500 dark:text-neutral-400" />
                        </div>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{data.length}</p>
                    <p className="text-sm text-gray-500 dark:text-neutral-400">Total projets</p>
                </div>

                <div className="p-5 rounded-xl bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#1f1f1f]">
                    <div className="flex items-center justify-between mb-3">
                        <div className="p-2 rounded-lg bg-gray-100 dark:bg-[#1a1a1a]">
                            <Star className="h-4 w-4 text-gray-500 dark:text-neutral-400" />
                        </div>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{featuredCount}</p>
                    <p className="text-sm text-gray-500 dark:text-neutral-400">À la une</p>
                </div>

                <div className="p-5 rounded-xl bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#1f1f1f]">
                    <div className="flex items-center justify-between mb-3">
                        <div className="p-2 rounded-lg bg-gray-100 dark:bg-[#1a1a1a]">
                            <Layers className="h-4 w-4 text-gray-500 dark:text-neutral-400" />
                        </div>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{categoriesCount}</p>
                    <p className="text-sm text-gray-500 dark:text-neutral-400">Catégories</p>
                </div>
            </div>

            {/* Data Table */}
            <div className="rounded-xl bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#1f1f1f] overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-[#1f1f1f]">
                    <h2 className="font-semibold text-gray-900 dark:text-white">Liste des projets</h2>
                    <p className="text-sm text-gray-500 dark:text-neutral-400">{data.length} projet(s) au total</p>
                </div>
                <DataTable
                    columns={columns}
                    data={data}
                    searchPlaceholder="Rechercher un projet..."
                    pageSize={10}
                />
            </div>
        </div>
    )
}
