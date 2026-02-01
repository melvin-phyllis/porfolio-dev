"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronRight, Sun, Moon, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface AdminHeaderProps {
    title?: string;
    subtitle?: string;
    children?: React.ReactNode;
    sidebarCollapsed?: boolean;
    onMobileMenuToggle?: () => void;
}

const routeNames: Record<string, string> = {
    "admin": "Admin",
    "dashboard": "Dashboard",
    "projects": "Projets",
    "articles": "Articles",
    "skills": "Compétences",
    "experiences": "Expériences",
    "analytics": "Analytics",
    "settings": "Paramètres",
    "new": "Nouveau",
    "edit": "Modifier",
};

export function AdminHeader({ title, subtitle, children, sidebarCollapsed = false, onMobileMenuToggle }: AdminHeaderProps) {
    const pathname = usePathname();
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Générer le breadcrumb
    const segments = pathname.split("/").filter(Boolean);
    const breadcrumbs = segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");
        const isLast = index === segments.length - 1;
        const isId = /^[a-z0-9]{20,}$/i.test(segment) || /^c[a-z0-9]{24}$/i.test(segment);
        const name = isId ? "Détails" : (routeNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1));
        return { name, href, isLast };
    });

    const pageTitle = title || (breadcrumbs.length > 0
        ? breadcrumbs[breadcrumbs.length - 1].name
        : "Dashboard");

    const isDark = resolvedTheme === "dark";

    const toggleTheme = () => {
        setTheme(isDark ? "light" : "dark");
    };

    return (
        <motion.header
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
                "fixed top-0 right-0 z-30 backdrop-blur-md border-b transition-all duration-200",
                "bg-white/95 dark:bg-gray-900/95 border-gray-200 dark:border-gray-800",
                // Desktop: ajuster selon sidebar
                "left-0 lg:left-[260px]",
                sidebarCollapsed && "lg:left-[72px]"
            )}
        >
            <div className="flex h-16 items-center justify-between px-4 md:px-6">
                {/* Left: Menu button (mobile) + Breadcrumb & Title */}
                <div className="flex items-center gap-3">
                    {/* Bouton Menu Mobile */}
                    <button
                        onClick={onMobileMenuToggle}
                        className="lg:hidden p-2 -ml-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <Menu className="h-6 w-6" />
                    </button>

                    <div className="flex flex-col gap-0.5">
                        {/* Breadcrumb - caché sur mobile */}
                        <nav className="hidden sm:flex items-center gap-1 text-xs">
                            {breadcrumbs.slice(1).map((crumb, index) => (
                                <div key={crumb.href} className="flex items-center gap-1">
                                    {index > 0 && (
                                        <ChevronRight className="h-3 w-3 text-gray-400 dark:text-gray-600" />
                                    )}
                                    {crumb.isLast ? (
                                        <span className="text-gray-700 dark:text-gray-300">{crumb.name}</span>
                                    ) : (
                                        <Link
                                            href={crumb.href}
                                            className="text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                                        >
                                            {crumb.name}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </nav>

                        {/* Page Title */}
                        <h1 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate max-w-[200px] sm:max-w-none">
                            {pageTitle}
                        </h1>
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 sm:gap-3">
                    {/* Theme Toggle */}
                    {mounted && (
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            title={isDark ? "Mode clair" : "Mode sombre"}
                        >
                            {isDark ? (
                                <Sun className="h-5 w-5" />
                            ) : (
                                <Moon className="h-5 w-5" />
                            )}
                        </button>
                    )}
                    {children}
                </div>
            </div>

            {/* Subtitle bar if provided */}
            {subtitle && (
                <div className="border-t border-gray-200 dark:border-gray-800 px-4 md:px-6 py-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>
                </div>
            )}
        </motion.header>
    );
}
