import { Eye, TrendingUp, FileText, Users, MousePointer, Globe } from "lucide-react";
import { getArticles, getDailyStats, getTopPages, getTotalStats } from "@/lib/firebase-db";
import { AnalyticsChart } from "@/components/admin/charts/AnalyticsChart";
import { TopPagesTable } from "@/components/admin/charts/TopPagesTable";
import { VercelAnalyticsCard } from "@/components/admin/charts/VercelAnalyticsCard";

export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
    const [articles, dailyStats, topPages, totalStats] = await Promise.all([
        getArticles(),
        getDailyStats(30),
        getTopPages(30),
        getTotalStats(30),
    ]);

    const publishedArticles = articles.filter(a => a.published);
    const totalArticleViews = articles.reduce((acc, a) => acc + (a.views || 0), 0);

    const topArticles = [...publishedArticles]
        .sort((a, b) => (b.views || 0) - (a.views || 0))
        .slice(0, 5);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Analytics</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">
                    Statistiques détaillées de votre portfolio (30 derniers jours)
                </p>
            </div>

            {/* Overview Stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="p-5 rounded-2xl bg-white dark:bg-white/3 border border-gray-200 dark:border-gray-800">
                    <div className="flex items-center justify-between mb-3">
                        <div className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800">
                            <Eye className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        </div>
                    </div>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">{totalStats.totalViews}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Vues totales</p>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-white/3 border border-gray-200 dark:border-gray-800">
                    <div className="flex items-center justify-between mb-3">
                        <div className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800">
                            <Users className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        </div>
                    </div>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">{totalStats.uniqueVisitors}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Visiteurs uniques</p>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-white/3 border border-gray-200 dark:border-gray-800">
                    <div className="flex items-center justify-between mb-3">
                        <div className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800">
                            <TrendingUp className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        </div>
                    </div>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">{totalStats.avgViewsPerVisitor}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Pages/Visiteur</p>
                </div>

                <div className="p-5 rounded-2xl bg-white dark:bg-white/3 border border-gray-200 dark:border-gray-800">
                    <div className="flex items-center justify-between mb-3">
                        <div className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800">
                            <MousePointer className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        </div>
                    </div>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">{totalStats.totalEvents}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Événements</p>
                </div>
            </div>

            {/* Chart */}
            <div className="rounded-2xl bg-white dark:bg-white/3 border border-gray-200 dark:border-gray-800 overflow-hidden">
                <div className="p-4 md:p-5 border-b border-gray-200 dark:border-gray-800">
                    <h2 className="font-semibold text-gray-800 dark:text-white">Trafic des 30 derniers jours</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Évolution des vues et visiteurs uniques</p>
                </div>
                <div className="p-4 md:p-5">
                    <AnalyticsChart data={dailyStats} />
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Top Pages */}
                <div className="rounded-2xl bg-white dark:bg-white/3 border border-gray-200 dark:border-gray-800 overflow-hidden">
                    <div className="p-4 md:p-5 border-b border-gray-200 dark:border-gray-800">
                        <div className="flex items-center gap-2">
                            <Globe className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            <h2 className="font-semibold text-gray-800 dark:text-white">Pages les plus visitées</h2>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Top 10 des pages par nombre de vues</p>
                    </div>
                    <div className="p-4 md:p-5">
                        <TopPagesTable pages={topPages} />
                    </div>
                </div>

                {/* Top Articles */}
                <div className="rounded-2xl bg-white dark:bg-white/3 border border-gray-200 dark:border-gray-800 overflow-hidden">
                    <div className="p-4 md:p-5 border-b border-gray-200 dark:border-gray-800">
                        <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                            <h2 className="font-semibold text-gray-800 dark:text-white">Articles les plus lus</h2>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Top 5 des articles par nombre de lectures</p>
                    </div>
                    <div className="p-4 md:p-5">
                        {topArticles.length === 0 ? (
                            <p className="text-gray-500 dark:text-gray-400 text-sm py-4 text-center">
                                Aucun article publié pour le moment.
                            </p>
                        ) : (
                            <div className="space-y-4">
                                {topArticles.map((article, index) => (
                                    <div
                                        key={article.id}
                                        className="flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-lg font-bold text-gray-400 dark:text-gray-600 w-6">
                                                {index + 1}
                                            </span>
                                            <div>
                                                <p className="font-medium text-sm text-gray-800 dark:text-white line-clamp-1">
                                                    {article.title}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    {article.category}
                                                </p>
                                            </div>
                                        </div>
                                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 tabular-nums">
                                            {article.views || 0} vues
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Article Stats Summary */}
            <div className="rounded-2xl bg-white dark:bg-white/3 border border-gray-200 dark:border-gray-800 p-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800">
                            <FileText className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        </div>
                        <div>
                            <p className="font-medium text-gray-800 dark:text-white">Statistiques Articles</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {publishedArticles.length} articles publiés - {totalArticleViews} lectures totales
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-bold text-gray-800 dark:text-white">
                            {publishedArticles.length > 0 ? Math.round(totalArticleViews / publishedArticles.length) : 0}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">moy. par article</p>
                    </div>
                </div>
            </div>

            {/* Vercel Analytics */}
            <VercelAnalyticsCard />
        </div>
    );
}
