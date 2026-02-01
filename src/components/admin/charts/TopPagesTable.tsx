"use client";

interface TopPage {
    page: string;
    views: number;
    uniqueVisitors: number;
}

interface TopPagesTableProps {
    pages: TopPage[];
}

export function TopPagesTable({ pages }: TopPagesTableProps) {
    if (pages.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                Aucune page visitée pour cette période.
            </div>
        );
    }

    const formatPagePath = (path: string) => {
        if (path === "/") return "Accueil";
        if (path === "/fr") return "Accueil (FR)";
        if (path === "/en") return "Accueil (EN)";

        // Clean up the path for display
        const cleanPath = path
            .replace(/^\/(fr|en)/, "")
            .replace(/^\//, "")
            .replace(/-/g, " ")
            .replace(/\//g, " › ");

        return cleanPath.charAt(0).toUpperCase() + cleanPath.slice(1) || path;
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                        <th className="text-left py-3 px-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-12">
                            #
                        </th>
                        <th className="text-left py-3 px-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Page
                        </th>
                        <th className="text-right py-3 px-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Vues
                        </th>
                        <th className="text-right py-3 px-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Visiteurs
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {pages.map((page, index) => (
                        <tr key={page.page} className="hover:bg-gray-50 dark:hover:bg-white/2">
                            <td className="py-3 px-2 font-medium text-gray-400 dark:text-gray-600">
                                {index + 1}
                            </td>
                            <td className="py-3 px-2">
                                <div className="flex flex-col">
                                    <span className="font-medium text-gray-800 dark:text-white text-sm">
                                        {formatPagePath(page.page)}
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[200px]">
                                        {page.page}
                                    </span>
                                </div>
                            </td>
                            <td className="py-3 px-2 text-right tabular-nums text-gray-800 dark:text-white">
                                {page.views.toLocaleString("fr-FR")}
                            </td>
                            <td className="py-3 px-2 text-right tabular-nums text-gray-800 dark:text-white">
                                {page.uniqueVisitors.toLocaleString("fr-FR")}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
