"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import {
    LayoutDashboard,
    FolderOpen,
    Code2,
    Briefcase,
    Settings,
    LogOut,
    FileText,
    BarChart3,
    ChevronLeft,
    ChevronRight,
    ExternalLink,
    X,
} from "lucide-react";

const navItems = [
    {
        href: "/admin/dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
    },
    {
        href: "/admin/dashboard/projects",
        label: "Projets",
        icon: FolderOpen,
    },
    {
        href: "/admin/dashboard/articles",
        label: "Articles",
        icon: FileText,
    },
    {
        href: "/admin/dashboard/skills",
        label: "Compétences",
        icon: Code2,
    },
    {
        href: "/admin/dashboard/experiences",
        label: "Expériences",
        icon: Briefcase,
    },
    {
        href: "/admin/dashboard/analytics",
        label: "Analytics",
        icon: BarChart3,
    },
    {
        href: "/admin/dashboard/settings",
        label: "Paramètres",
        icon: Settings,
    },
];

interface SidebarProps {
    collapsed?: boolean;
    onCollapse?: (collapsed: boolean) => void;
    mobileOpen?: boolean;
    onMobileClose?: () => void;
}

export function Sidebar({ collapsed = false, onCollapse, mobileOpen = false, onMobileClose }: SidebarProps) {
    const pathname = usePathname();

    const toggleCollapse = () => {
        onCollapse?.(!collapsed);
    };

    const handleNavClick = () => {
        // Fermer la sidebar mobile après navigation
        if (onMobileClose) {
            onMobileClose();
        }
    };

    const sidebarContent = (
        <>
            {/* Logo / Brand */}
            <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
                <AnimatePresence mode="wait">
                    {!collapsed && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-3"
                        >
                            <div className="h-9 w-9 rounded-xl bg-brand-500 flex items-center justify-center">
                                <span className="text-white font-bold">P</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold text-gray-900 dark:text-white text-sm">Portfolio</span>
                                <span className="text-[10px] text-gray-500 dark:text-gray-400">Admin Panel</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {collapsed && (
                    <div className="h-9 w-9 rounded-xl bg-brand-500 flex items-center justify-center mx-auto">
                        <span className="text-white font-bold">P</span>
                    </div>
                )}

                {/* Bouton collapse - desktop only */}
                {!collapsed && (
                    <button
                        onClick={toggleCollapse}
                        className="hidden lg:flex p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                )}

                {/* Bouton fermer - mobile only */}
                {onMobileClose && (
                    <button
                        onClick={onMobileClose}
                        className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                )}
            </div>

            {/* Expand button when collapsed - desktop only */}
            {collapsed && (
                <div className="hidden lg:block px-3 py-3 border-b border-gray-200 dark:border-gray-800">
                    <button
                        onClick={toggleCollapse}
                        className="w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center justify-center"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            )}

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href || 
                        (item.href !== "/admin/dashboard" && pathname.startsWith(`${item.href}/`));

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={handleNavClick}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                                collapsed && "lg:justify-center lg:px-2",
                                isActive
                                    ? "bg-brand-500 text-white"
                                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                            )}
                            title={collapsed ? item.label : undefined}
                        >
                            <Icon className={cn("h-5 w-5 shrink-0", isActive && "text-white")} />
                            <span className={cn(collapsed && "lg:hidden")}>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                {/* View Site Link */}
                <div className={cn("px-3 py-3 border-b border-gray-200 dark:border-gray-800", collapsed && "lg:px-2")}>
                    <Link
                        href="/"
                        target="_blank"
                        className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
                            collapsed && "lg:justify-center lg:px-2"
                        )}
                        title={collapsed ? "Voir le site" : undefined}
                    >
                        <ExternalLink className="h-5 w-5 shrink-0" />
                        <span className={cn(collapsed && "lg:hidden")}>Voir le site</span>
                    </Link>
                </div>

                {/* Logout */}
                <div className={cn("px-3 py-3", collapsed && "lg:px-2")}>
                    <button
                        onClick={() => signOut({ callbackUrl: "/admin/login" })}
                        className={cn(
                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-error-500 dark:text-error-400 hover:text-error-600 dark:hover:text-error-300 hover:bg-error-50 dark:hover:bg-error-500/10 transition-colors",
                            collapsed && "lg:justify-center lg:px-2"
                        )}
                        title={collapsed ? "Déconnexion" : undefined}
                    >
                        <LogOut className="h-5 w-5 shrink-0" />
                        <span className={cn(collapsed && "lg:hidden")}>Déconnexion</span>
                    </button>
                </div>
            </div>
        </>
    );

    return (
        <>
            {/* Overlay mobile */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onMobileClose}
                        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar Mobile */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.aside
                        initial={{ x: -280 }}
                        animate={{ x: 0 }}
                        exit={{ x: -280 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="fixed left-0 top-0 z-50 h-screen w-[280px] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col lg:hidden"
                    >
                        {sidebarContent}
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Sidebar Desktop */}
            <motion.aside
                initial={false}
                animate={{ width: collapsed ? 72 : 260 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="hidden lg:flex fixed left-0 top-0 z-40 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex-col"
            >
                {sidebarContent}
            </motion.aside>
        </>
    );
}
