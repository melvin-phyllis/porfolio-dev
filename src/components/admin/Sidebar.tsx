"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    FolderOpen,
    Code2,
    Briefcase,
    Settings,
    LogOut,
    User,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

const navItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/dashboard/projects", label: "Projets", icon: FolderOpen },
    { href: "/admin/dashboard/skills", label: "Compétences", icon: Code2 },
    { href: "/admin/dashboard/experiences", label: "Expériences", icon: Briefcase },
    { href: "/admin/dashboard/settings", label: "Paramètres", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-[#222] bg-[#1a1a1a] text-white shadow-xl">
            <div className="flex h-16 items-center border-b border-[#222] px-6 bg-[#111]">
                <span className="text-xl font-bold tracking-wider">PORTFOLIO<span className="text-[#888]">ADMIN</span></span>
            </div>
            <div className="flex flex-col justify-between h-[calc(100vh-64px)] p-4 bg-[#111]">
                <nav className="space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="border-t pt-4">
                    {/* User Profile Summary could go here */}
                    <div className="flex items-center gap-3 mb-4 px-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <User className="h-4 w-4" />
                        </div>
                        <div className="text-sm">
                            <p className="font-medium">Admin</p>
                            <p className="text-xs text-muted-foreground">marie@portfolio...</p>
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => signOut({ callbackUrl: "/admin/login" })}
                    >
                        <LogOut className="h-4 w-4" />
                        Déconnexion
                    </Button>
                </div>
            </div>
        </aside>
    );
}
