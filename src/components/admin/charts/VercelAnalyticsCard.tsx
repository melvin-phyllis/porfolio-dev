import { Activity, Clock, ArrowDownUp, ExternalLink } from "lucide-react";
import { getVercelAnalyticsSummary, getVercelReferrers, isVercelAnalyticsConfigured } from "@/lib/vercel-analytics";
import Link from "next/link";

export async function VercelAnalyticsCard() {
    const isConfigured = await isVercelAnalyticsConfigured();

    if (!isConfigured) {
        return (
            <div className="rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 p-5 md:p-6">
                <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    <h3 className="font-semibold text-gray-800 dark:text-white">Vercel Analytics</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Analytics avancées non configurées
                </p>
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                    <p>Pour activer Vercel Analytics API:</p>
                    <ol className="list-decimal list-inside space-y-1 text-gray-500 dark:text-gray-400">
                        <li>
                            Créez un token sur{" "}
                            <Link
                                href="https://vercel.com/account/tokens"
                                target="_blank"
                                className="text-brand-500 dark:text-brand-400 underline inline-flex items-center gap-1"
                            >
                                Vercel <ExternalLink className="h-3 w-3" />
                            </Link>
                        </li>
                        <li>Ajoutez dans .env:</li>
                    </ol>
                    <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-xs mt-2 overflow-x-auto text-gray-800 dark:text-gray-200">
                        {`VERCEL_API_TOKEN=your_token\nVERCEL_PROJECT_ID=your_project_id`}
                    </pre>
                </div>
            </div>
        );
    }

    const [summary, referrers] = await Promise.all([
        getVercelAnalyticsSummary(30),
        getVercelReferrers(30, 5),
    ]);

    if (!summary) {
        return (
            <div className="rounded-2xl bg-white dark:bg-white/3 border border-gray-200 dark:border-gray-800 p-5 md:p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Activity className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    <h3 className="font-semibold text-gray-800 dark:text-white">Vercel Analytics</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Impossible de charger les données Vercel. Vérifiez vos credentials.
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-2xl bg-white dark:bg-white/3 border border-gray-200 dark:border-gray-800 p-5 md:p-6">
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                    <Activity className="h-5 w-5 text-brand-500" />
                    <h3 className="font-semibold text-gray-800 dark:text-white">Vercel Analytics</h3>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Données de trafic global (30 derniers jours)
                </p>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="space-y-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Pages Vues</p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">{summary.pageViews.toLocaleString("fr-FR")}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Visiteurs</p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">{summary.visitors.toLocaleString("fr-FR")}</p>
                </div>
                <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                        <ArrowDownUp className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">Bounce Rate</p>
                    </div>
                    <p className="text-xl font-semibold text-gray-800 dark:text-white">{summary.bounceRate}%</p>
                </div>
                <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">Durée Moy.</p>
                    </div>
                    <p className="text-xl font-semibold text-gray-800 dark:text-white">{formatDuration(summary.avgDuration)}</p>
                </div>
            </div>

            {/* Top Referrers */}
            {referrers.length > 0 && (
                <div>
                    <h4 className="font-medium text-gray-800 dark:text-white mb-3">Sources de Trafic</h4>
                    <div className="space-y-2">
                        {referrers.map((ref, i) => (
                            <div key={i} className="flex items-center justify-between text-sm">
                                <span className="truncate max-w-[200px] text-gray-700 dark:text-gray-300">{ref.referrer}</span>
                                <span className="text-gray-500 dark:text-gray-400 tabular-nums">{ref.views}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function formatDuration(seconds: number): string {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
}
