import { getArticles } from "@/lib/firebase-db"
import { columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import Link from "next/link"
import { Plus, FileText, CheckCircle2, Eye, Star } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function ArticlesPage() {
    const data = await getArticles()

    const publishedCount = data.filter(a => a.published).length
    const draftCount = data.filter(a => !a.published).length
    const totalViews = data.reduce((sum, a) => sum + (a.views || 0), 0)
    const featuredCount = data.filter(a => a.featured).length

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90">Articles</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Gérez votre blog et vos publications</p>
                </div>
                <Link
                    href="/admin/dashboard/articles/new"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-brand-500 text-white text-sm font-medium hover:bg-brand-600 transition-colors shadow-theme-xs"
                >
                    <Plus className="h-4 w-4" />
                    Nouvel article
                </Link>
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 mb-4">
                        <FileText className="h-6 w-6 text-gray-800 dark:text-white/90" />
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Total articles</span>
                    <h4 className="mt-1 text-2xl font-bold text-gray-800 dark:text-white/90">{data.length}</h4>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 mb-4">
                        <CheckCircle2 className="h-6 w-6 text-gray-800 dark:text-white/90" />
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        Publiés
                        {draftCount > 0 && (
                            <span className="text-warning-500 ml-1">({draftCount} brouillons)</span>
                        )}
                    </span>
                    <h4 className="mt-1 text-2xl font-bold text-gray-800 dark:text-white/90">{publishedCount}</h4>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 mb-4">
                        <Eye className="h-6 w-6 text-gray-800 dark:text-white/90" />
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Vues totales</span>
                    <h4 className="mt-1 text-2xl font-bold text-gray-800 dark:text-white/90">{totalViews.toLocaleString()}</h4>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 mb-4">
                        <Star className="h-6 w-6 text-gray-800 dark:text-white/90" />
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Mis en avant</span>
                    <h4 className="mt-1 text-2xl font-bold text-gray-800 dark:text-white/90">{featuredCount}</h4>
                </div>
            </div>

            {/* Data Table */}
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Liste des articles</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {data.length} article(s) - {publishedCount} publié(s) - {totalViews.toLocaleString()} vue(s)
                    </p>
                </div>
                <DataTable
                    columns={columns}
                    data={data}
                    searchPlaceholder="Rechercher un article..."
                    pageSize={10}
                />
            </div>
        </div>
    )
}
