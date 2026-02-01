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
        default: "Marie Danielle Akpeuby | Développeuse Fullstack & DevOps",
        template: "%s | Marie Danielle Akpeuby",
    },
    description:
        "Portfolio de Marie Danielle Akpeuby - Développeuse Fullstack & DevOps spécialisée en React, Next.js, Node.js, Docker et Kubernetes. Création d'applications web modernes et performantes.",
    keywords: [
        "développeur fullstack",
        "devops",
        "react",
        "next.js",
        "node.js",
        "docker",
        "kubernetes",
        "côte d'ivoire",
        "abidjan",
        "développement web",
        "typescript",
        "javascript",
        "cloud",
        "aws",
        "vercel",
    ],
    authors: [{ name: "Marie Danielle Akpeuby", url: "https://github.com/zaerthnh" }],
    creator: "Marie Danielle Akpeuby",
    publisher: "Marie Danielle Akpeuby",
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
        siteName: "Marie Danielle Akpeuby - Portfolio",
        title: "Marie Danielle Akpeuby | Développeuse Fullstack & DevOps",
        description:
            "Développeuse Fullstack & DevOps créant des applications web modernes et performantes avec React, Next.js et Node.js.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Marie Danielle Akpeuby - Développeuse Fullstack & DevOps",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Marie Danielle Akpeuby | Développeuse Fullstack & DevOps",
        description:
            "Développeuse Fullstack & DevOps créant des applications web modernes et performantes.",
        creator: "@zaerthnh",
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
