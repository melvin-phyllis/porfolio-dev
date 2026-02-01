"use client";

import { motion } from "framer-motion";
import {
    FolderGit2,
    FileText,
    Eye,
    Code2,
    Briefcase,
    TrendingUp,
    ArrowUpRight,
    Activity,
    Plus,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

// Types
interface DashboardStats {
    projects: number;
    articles: number;
    articleViews: number;
    skills: number;
    experiences: number;
    publishedArticles: number;
}

interface RecentActivity {
    id: string;
    type: "project" | "article" | "skill" | "experience";
    title: string;
    action: string;
    date: string;
}

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3 },
    },
};

// Données mockées
const mockStats: DashboardStats = {
    projects: 12,
    articles: 8,
    articleViews: 1250,
    skills: 24,
    experiences: 5,
    publishedArticles: 6,
};

const mockActivities: RecentActivity[] = [
    { id: "1", type: "project", title: "E-commerce Platform", action: "Créé", date: "2025-01-30" },
    { id: "2", type: "article", title: "Introduction à Next.js 15", action: "Publié", date: "2025-01-28" },
    { id: "3", type: "skill", title: "Kubernetes", action: "Ajouté", date: "2025-01-25" },
    { id: "4", type: "experience", title: "Développeuse Fullstack", action: "Modifié", date: "2025-01-20" },
];

// Stats cards config
const statCards = [
    {
        title: "Projets",
        value: mockStats.projects,
        icon: FolderGit2,
        trend: "+2",
        href: "/admin/dashboard/projects",
    },
    {
        title: "Articles",
        value: mockStats.articles,
        icon: FileText,
        trend: "+3",
        href: "/admin/dashboard/articles",
    },
    {
        title: "Vues totales",
        value: mockStats.articleViews,
        icon: Eye,
        trend: "+12%",
        href: "/admin/dashboard/analytics",
    },
    {
        title: "Compétences",
        value: mockStats.skills,
        icon: Code2,
        trend: "+5",
        href: "/admin/dashboard/skills",
    },
    {
        title: "Expériences",
        value: mockStats.experiences,
        icon: Briefcase,
        trend: null,
        href: "/admin/dashboard/experiences",
    },
];

const quickActions = [
    { label: "Nouveau projet", href: "/admin/dashboard/projects/new", icon: FolderGit2 },
    { label: "Nouvel article", href: "/admin/dashboard/articles/new", icon: FileText },
    { label: "Nouvelle compétence", href: "/admin/dashboard/skills/new", icon: Code2 },
];

const getActivityIcon = (type: string) => {
    switch (type) {
        case "project": return FolderGit2;
        case "article": return FileText;
        case "skill": return Code2;
        case "experience": return Briefcase;
        default: return Activity;
    }
};

export default function DashboardPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className="space-y-8">
            {/* Welcome Banner */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-2xl bg-linear-to-br from-gray-100 dark:from-[#1a1a1a] to-gray-50 dark:to-[#0f0f0f] border border-gray-200 dark:border-[#262626] p-8"
            >
                <div className="relative z-10">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Bienvenue sur votre espace admin
                    </h1>
                    <p className="text-gray-600 dark:text-neutral-300 max-w-xl">
                        Gérez votre portfolio, vos projets, articles et compétences depuis cette interface.
                    </p>
                </div>

                {/* Decorative element */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block">
                    <div className="w-24 h-24 rounded-full bg-gray-900/5 dark:bg-white/5 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-gray-900/5 dark:bg-white/5 flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full bg-gray-900/10 dark:bg-white/10" />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
            >
                {statCards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <motion.div key={card.title} variants={itemVariants}>
                            <Link href={card.href}>
                                <div className="group p-5 rounded-xl bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#1f1f1f] hover:border-gray-300 dark:hover:border-[#333333] transition-all duration-200 hover:bg-gray-50 dark:hover:bg-[#141414]">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="p-2 rounded-lg bg-gray-100 dark:bg-[#1a1a1a]">
                                            <Icon className="h-4 w-4 text-gray-500 dark:text-neutral-400" />
                                        </div>
                                        {card.trend && (
                                            <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                                                <TrendingUp className="h-3 w-3" />
                                                {card.trend}
                                            </span>
                                        )}
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {card.value.toLocaleString()}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-neutral-400">{card.title}</p>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    );
                })}
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Recent Activity */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2"
                >
                    <div className="rounded-xl bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#1f1f1f] overflow-hidden">
                        <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-[#1f1f1f]">
                            <div>
                                <h2 className="font-semibold text-gray-900 dark:text-white">Activité récente</h2>
                                <p className="text-sm text-gray-500 dark:text-neutral-400">Vos dernières modifications</p>
                            </div>
                            <Link
                                href="/admin/dashboard/analytics"
                                className="text-sm text-gray-500 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1"
                            >
                                Voir tout
                                <ArrowUpRight className="h-3 w-3" />
                            </Link>
                        </div>
                        <div className="divide-y divide-gray-200 dark:divide-[#1f1f1f]">
                            {mockActivities.map((activity, index) => {
                                const Icon = getActivityIcon(activity.type);
                                return (
                                    <motion.div
                                        key={activity.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + index * 0.05 }}
                                        className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-[#141414] transition-colors"
                                    >
                                        <div className="p-2 rounded-lg bg-gray-100 dark:bg-[#1a1a1a]">
                                            <Icon className="h-4 w-4 text-gray-500 dark:text-neutral-400" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                {activity.title}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-neutral-400">
                                                {activity.action} • {new Date(activity.date).toLocaleDateString("fr-FR", {
                                                    day: "numeric",
                                                    month: "short",
                                                })}
                                            </p>
                                        </div>
                                        <span className={`text-xs px-2 py-1 rounded-md ${
                                            activity.action === "Créé"
                                                ? "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                                : activity.action === "Publié"
                                                ? "bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
                                                : "bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400"
                                        }`}>
                                            {activity.action}
                                        </span>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="rounded-xl bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#1f1f1f] overflow-hidden">
                        <div className="p-5 border-b border-gray-200 dark:border-[#1f1f1f]">
                            <h2 className="font-semibold text-gray-900 dark:text-white">Actions rapides</h2>
                            <p className="text-sm text-gray-500 dark:text-neutral-400">Créer du nouveau contenu</p>
                        </div>
                        <div className="p-4 space-y-2">
                            {quickActions.map((action) => {
                                const Icon = action.icon;
                                return (
                                    <Link
                                        key={action.href}
                                        href={action.href}
                                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-colors group"
                                    >
                                        <div className="p-2 rounded-lg bg-gray-100 dark:bg-[#1a1a1a] group-hover:bg-gray-200 dark:group-hover:bg-[#262626] transition-colors">
                                            <Icon className="h-4 w-4 text-gray-500 dark:text-neutral-400" />
                                        </div>
                                        <span className="text-sm text-gray-600 dark:text-neutral-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                                            {action.label}
                                        </span>
                                        <Plus className="h-4 w-4 text-gray-400 dark:text-neutral-600 ml-auto group-hover:text-gray-500 dark:group-hover:text-neutral-400 transition-colors" />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Content Progress */}
                    <div className="mt-4 rounded-xl bg-white dark:bg-[#111111] border border-gray-200 dark:border-[#1f1f1f] overflow-hidden">
                        <div className="p-5 border-b border-gray-200 dark:border-[#1f1f1f]">
                            <h2 className="font-semibold text-gray-900 dark:text-white">Progression</h2>
                            <p className="text-sm text-gray-500 dark:text-neutral-400">Complétion du contenu</p>
                        </div>
                        <div className="p-4 space-y-4">
                            {/* Projects */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-neutral-300">Projets</span>
                                    <span className="text-gray-900 dark:text-white">{mockStats.projects}/15</span>
                                </div>
                                <div className="h-1.5 bg-gray-200 dark:bg-[#1a1a1a] rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gray-900 dark:bg-white rounded-full transition-all duration-500"
                                        style={{ width: `${(mockStats.projects / 15) * 100}%` }}
                                    />
                                </div>
                            </div>

                            {/* Skills */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-neutral-300">Compétences</span>
                                    <span className="text-gray-900 dark:text-white">{mockStats.skills}/30</span>
                                </div>
                                <div className="h-1.5 bg-gray-200 dark:bg-[#1a1a1a] rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gray-900 dark:bg-white rounded-full transition-all duration-500"
                                        style={{ width: `${(mockStats.skills / 30) * 100}%` }}
                                    />
                                </div>
                            </div>

                            {/* Articles */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-neutral-300">Articles publiés</span>
                                    <span className="text-gray-900 dark:text-white">{mockStats.publishedArticles}/{mockStats.articles}</span>
                                </div>
                                <div className="h-1.5 bg-gray-200 dark:bg-[#1a1a1a] rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gray-900 dark:bg-white rounded-full transition-all duration-500"
                                        style={{ width: `${(mockStats.publishedArticles / mockStats.articles) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
