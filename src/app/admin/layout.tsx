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
        <div className="min-h-screen bg-background font-sans antialiased">
            {children}
        </div>
    );
}
