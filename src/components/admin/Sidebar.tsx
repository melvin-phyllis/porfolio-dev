"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard, User, FolderOpen, Code2, Clock, MessageSquare,
    Settings, ChevronLeft, ChevronRight, BarChart3, HelpCircle, Star, Wrench, LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

const navItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/dashboard/projects", label: "Projets", icon: FolderOpen },
    { href: "/admin/dashboard/skills", label: "Compétences", icon: Code2 },
    { href: "/admin/dashboard/experiences", label: "Expérience", icon: Clock },
    { href: "/admin/dashboard/articles", label: "Articles", icon: MessageSquare },
    { href: "/admin/dashboard/analytics", label: "Analytiques", icon: BarChart3 },
    { href: "/admin/dashboard/settings", label: "Paramètres", icon: Settings },
];

interface SidebarProps {
    collapsed: boolean;
    onCollapse: (v: boolean) => void;
    mobileOpen?: boolean;
    onMobileClose?: () => void;
}

export function Sidebar({ collapsed, onCollapse, mobileOpen, onMobileClose }: SidebarProps) {
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === "/admin/dashboard") return pathname === href;
        return pathname.startsWith(href);
    };

    return (
        <motion.aside
            initial={false}
            animate={{ width: collapsed ? 72 : 260 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={cn(
                "fixed top-0 left-0 z-40 h-full flex flex-col overflow-hidden",
                "border-r",
            )}
            style={{
                background: "#0a0a0a",
                borderColor: "rgba(245,158,11,0.12)"
            }}
        >
            {/* Logo */}
            <div
                className="flex items-center h-16 px-4 border-b shrink-0"
                style={{ borderColor: "rgba(245,158,11,0.12)" }}
            >
                <Link href="/admin/dashboard" className="flex items-center gap-3 overflow-hidden">
                    <motion.div
                        className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm"
                        style={{
                            background: "linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%)",
                            color: "#000",
                            boxShadow: "0 0 12px var(--gold-glow)"
                        }}
                    >
                        MP
                    </motion.div>
                    <AnimatePresence>
                        {!collapsed && (
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="font-semibold text-sm whitespace-nowrap text-white"
                            >
                                Admin Panel
                            </motion.span>
                        )}
                    </AnimatePresence>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
                {navItems.map((item) => {
                    const active = isActive(item.href);
                    return (
                        <Link key={item.href} href={item.href}>
                            <motion.div
                                whileHover={{ x: collapsed ? 0 : 4 }}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative",
                                    collapsed && "justify-center px-2"
                                )}
                                style={active ? {
                                    background: "linear-gradient(135deg, rgba(245,158,11,0.15) 0%, rgba(251,191,36,0.08) 100%)",
                                    color: "var(--gold-light)",
                                    borderLeft: "2px solid var(--gold)",
                                    boxShadow: "inset 0 0 20px rgba(245,158,11,0.05)"
                                } : {
                                    color: "#9ca3af"
                                }}
                                onMouseEnter={(e) => {
                                    if (!active) {
                                        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                                        (e.currentTarget as HTMLElement).style.color = "#ffffff";
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!active) {
                                        (e.currentTarget as HTMLElement).style.background = "";
                                        (e.currentTarget as HTMLElement).style.color = "#9ca3af";
                                    }
                                }}
                                title={collapsed ? item.label : undefined}
                            >
                                <item.icon
                                    className={cn("shrink-0", collapsed ? "w-5 h-5" : "w-4 h-4")}
                                    style={active ? { color: "var(--gold)" } : undefined}
                                />
                                <AnimatePresence>
                                    {!collapsed && (
                                        <motion.span
                                            initial={{ opacity: 0, x: -8 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -8 }}
                                            className="whitespace-nowrap"
                                        >
                                            {item.label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>

                                {/* Active indicator dot */}
                                {active && collapsed && (
                                    <span
                                        className="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-l"
                                        style={{ background: "var(--gold)" }}
                                    />
                                )}
                            </motion.div>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="px-2 py-4 border-t space-y-1" style={{ borderColor: "rgba(245,158,11,0.08)" }}>
                <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                        collapsed && "justify-center px-2"
                    )}
                    style={{ color: "#9ca3af" }}
                    onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.08)";
                        (e.currentTarget as HTMLElement).style.color = "#f87171";
                    }}
                    onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "";
                        (e.currentTarget as HTMLElement).style.color = "#9ca3af";
                    }}
                    title={collapsed ? "Déconnexion" : undefined}
                >
                    <LogOut className={cn("shrink-0", collapsed ? "w-5 h-5" : "w-4 h-4")} />
                    <AnimatePresence>
                        {!collapsed && (
                            <motion.span
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -8 }}
                                className="whitespace-nowrap"
                            >
                                Déconnexion
                            </motion.span>
                        )}
                    </AnimatePresence>
                </button>
            </div>

            {/* Toggle Button */}
            <button
                onClick={() => onCollapse(!collapsed)}
                className="absolute -right-3 top-20 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 z-50"
                style={{
                    background: "var(--gold)",
                    color: "#000",
                    boxShadow: "0 0 8px var(--gold-glow)"
                }}
                onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "var(--gold-light)";
                }}
                onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "var(--gold)";
                }}
            >
                {collapsed ? (
                    <ChevronRight className="w-3.5 h-3.5" />
                ) : (
                    <ChevronLeft className="w-3.5 h-3.5" />
                )}
            </button>
        </motion.aside>
    );
}
