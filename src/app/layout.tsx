import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
    variable: "--font-poppins",
    display: "swap",
});

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    ],
};

export const metadata: Metadata = {
    title: {
        default: "Melvin Akou | Développeur Web JS/PHP Full-Stack Junior — Portfolio",
        template: "%s | Melvin Akou — Développeur Web Full-Stack",
    },
    description:
        "Portfolio de Melvin Akou (Akou N'dy Phyllis Melvin / Melvyn), développeur web JavaScript & PHP full-stack junior basé en Côte d'Ivoire. Spécialisé en React, Next.js, Node.js, TypeScript, PHP, Laravel, Firebase, Tailwind CSS. Création d'applications web modernes, performantes et responsive.",
    keywords: [
        // Nom et variantes
        "Melvin Akou",
        "Melvyn Akou",
        "Akou Melvin",
        "Akou Melvyn",
        "Akou N'dy Phyllis Melvin",
        "melvin-phyllis",
        "melvin phyllis",
        "melvin dev",
        "melvyn dev",
        // Métier principal
        "développeur web",
        "développeur fullstack",
        "développeur full-stack",
        "développeur full stack",
        "développeur frontend",
        "développeur backend",
        "développeur junior",
        "web developer",
        "full-stack developer",
        "fullstack developer",
        "junior developer",
        // Technologies JS
        "développeur javascript",
        "développeur JS",
        "développeur react",
        "développeur next.js",
        "développeur node.js",
        "développeur typescript",
        "react",
        "next.js",
        "node.js",
        "typescript",
        "javascript",
        // Technologies PHP
        "développeur PHP",
        "développeur laravel",
        "PHP",
        "Laravel",
        // Autres technos
        "firebase",
        "tailwind css",
        "zustand",
        "prisma",
        "mongodb",
        "mysql",
        "docker",
        "vercel",
        "git",
        "github",
        // Localisation
        "côte d'ivoire",
        "abidjan",
        "développeur abidjan",
        "développeur côte d'ivoire",
        "développeur ivoirien",
        "développeur afrique",
        // Domaines
        "développement web",
        "création site web",
        "application web",
        "application mobile",
        "e-commerce",
        "portfolio développeur",
        "freelance développeur",
        "stage développeur web",
        "stagiaire développeur",
    ],
    authors: [{ name: "Melvin Akou", url: "https://github.com/melvin-phyllis" }],
    creator: "Melvin Akou",
    publisher: "Melvin Akou",
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://zaerthnh.dev"),
    alternates: {
        canonical: "/",
        languages: {
            fr: "/fr",
            en: "/en",
        },
    },
    openGraph: {
        type: "website",
        locale: "fr_FR",
        alternateLocale: ["en_US"],
        url: "/",
        siteName: "Melvin Akou — Développeur Web Full-Stack",
        title: "Melvin Akou | Développeur Web JS/PHP Full-Stack Junior — Portfolio",
        description:
            "Développeur web JavaScript & PHP full-stack junior en Côte d'Ivoire. Expertise React, Next.js, Laravel, Firebase. Projets modernes, performants et responsive.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Melvin Akou — Développeur Web JS/PHP Full-Stack Junior",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Melvin Akou | Développeur Web JS/PHP Full-Stack",
        description:
            "Développeur web JS/PHP full-stack junior en Côte d'Ivoire. React, Next.js, Laravel, Firebase. Portfolio & projets.",
        creator: "@melvin_phyllis",
        images: ["/og-image.png"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    verification: {
        google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
    category: "technology",
    manifest: "/manifest.webmanifest",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr" className={`${poppins.variable} scroll-smooth`} suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://ik.imagekit.io" />
                <link rel="dns-prefetch" href="https://ik.imagekit.io" />
            </head>
            <body className="font-sans antialiased">
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </body>
            <Analytics />
        </html>
    );
}
