import { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
    title: "Admin Dashboard",
    description: "Portfolio Admin Panel",
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-white dark:bg-[#050505] font-sans antialiased transition-colors duration-200">
            {children}
        </div>
    );
}
