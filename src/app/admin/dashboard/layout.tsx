import { Sidebar } from "@/components/admin/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50">
            <Sidebar />
            <main className="pl-64">
                <div className="container py-6 px-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
