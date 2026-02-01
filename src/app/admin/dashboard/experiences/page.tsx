import { getExperiences } from "@/lib/firebase-db"
import { columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import Link from "next/link"
import { Plus, Briefcase, Building2, CheckCircle2 } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function ExperiencesPage() {
    const data = await getExperiences()

    const currentJobs = data.filter(e => e.current).length
    const companies = new Set(data.map(e => e.company)).size

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90">Expériences</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Gérez votre parcours professionnel et académique</p>
                </div>
                <Link
                    href="/admin/dashboard/experiences/new"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-brand-500 text-white text-sm font-medium hover:bg-brand-600 transition-colors shadow-theme-xs"
                >
                    <Plus className="h-4 w-4" />
                    Nouvelle expérience
                </Link>
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 mb-4">
                        <Briefcase className="h-6 w-6 text-gray-800 dark:text-white/90" />
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Total expériences</span>
                    <h4 className="mt-1 text-2xl font-bold text-gray-800 dark:text-white/90">{data.length}</h4>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800">
                            <CheckCircle2 className="h-6 w-6 text-gray-800 dark:text-white/90" />
                        </div>
                        {currentJobs > 0 && (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500">
                                Actif
                            </span>
                        )}
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Postes actuels</span>
                    <h4 className="mt-1 text-2xl font-bold text-gray-800 dark:text-white/90">{currentJobs}</h4>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 mb-4">
                        <Building2 className="h-6 w-6 text-gray-800 dark:text-white/90" />
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Entreprises</span>
                    <h4 className="mt-1 text-2xl font-bold text-gray-800 dark:text-white/90">{companies}</h4>
                </div>
            </div>

            {/* Data Table */}
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Liste des expériences</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{data.length} expérience(s) au total</p>
                </div>
                <DataTable
                    columns={columns}
                    data={data}
                    searchPlaceholder="Rechercher une expérience..."
                    pageSize={10}
                />
            </div>
        </div>
    )
}
