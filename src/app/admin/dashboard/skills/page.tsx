import { getSkills } from "@/lib/firebase-db"
import { columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import Link from "next/link"
import { Plus, Code2, Layers, Award } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function SkillsPage() {
    const data = await getSkills()

    const categoryCount = data.reduce((acc, skill) => {
        acc[skill.category] = (acc[skill.category] || 0) + 1
        return acc
    }, {} as Record<string, number>)

    const avgLevel = data.length > 0
        ? Math.round(data.reduce((sum, s) => sum + s.level, 0) / data.length)
        : 0

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90">Compétences</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Gérez vos technologies et expertises</p>
                </div>
                <Link
                    href="/admin/dashboard/skills/new"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-brand-500 text-white text-sm font-medium hover:bg-brand-600 transition-colors shadow-theme-xs"
                >
                    <Plus className="h-4 w-4" />
                    Nouvelle compétence
                </Link>
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 mb-4">
                        <Code2 className="h-6 w-6 text-gray-800 dark:text-white/90" />
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Total compétences</span>
                    <h4 className="mt-1 text-2xl font-bold text-gray-800 dark:text-white/90">{data.length}</h4>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 mb-4">
                        <Award className="h-6 w-6 text-gray-800 dark:text-white/90" />
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Niveau moyen</span>
                    <h4 className="mt-1 text-2xl font-bold text-gray-800 dark:text-white/90">{avgLevel}%</h4>
                    <div className="mt-3 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-brand-500 rounded-full"
                            style={{ width: `${avgLevel}%` }}
                        />
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 mb-4">
                        <Layers className="h-6 w-6 text-gray-800 dark:text-white/90" />
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Catégories</span>
                    <h4 className="mt-1 text-2xl font-bold text-gray-800 dark:text-white/90">{Object.keys(categoryCount).length}</h4>
                </div>
            </div>

            {/* Data Table */}
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Liste des compétences</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {data.length} compétence(s) dans {Object.keys(categoryCount).length} catégorie(s)
                    </p>
                </div>
                <DataTable
                    columns={columns}
                    data={data}
                    searchPlaceholder="Rechercher une compétence..."
                    pageSize={10}
                />
            </div>
        </div>
    )
}
