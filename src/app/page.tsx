"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        // Détecter la langue du navigateur
        const browserLang = navigator.language || (navigator as Navigator & { userLanguage?: string }).userLanguage || "fr";
        const langCode = browserLang.split("-")[0].toLowerCase();

        // Rediriger vers la langue appropriée
        if (langCode === "en") {
            router.replace("/en");
        } else {
            // Par défaut, rediriger vers le français
            router.replace("/fr");
        }
    }, [router]);

    // Page de chargement pendant la redirection
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="text-center">
                {/* Spinner de chargement */}
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-brand-500 border-t-transparent mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                    Redirection en cours...
                </p>
            </div>
        </div>
    );
}
