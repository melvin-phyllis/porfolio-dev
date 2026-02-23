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
        default: "Melvin Akou | Développeur Web Full-Stack JS/PHP",
        template: "%s | Melvin Akou",
    },
    description:
        "Portfolio de Melvin Akou, développeur web JavaScript & PHP full-stack à Abidjan. React, Next.js, Laravel, Firebase. Applications web modernes et performantes.",
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
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://melvin-dev.com"),
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
        siteName: "Melvin Akou — Portfolio",
        title: "Melvin Akou | Développeur Web Full-Stack JS/PHP",
        description:
            "Développeur web JS/PHP full-stack à Abidjan. React, Next.js, Laravel, Firebase. Projets modernes et responsive.",
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
        title: "Melvin Akou | Développeur Web Full-Stack JS/PHP",
        description:
            "Développeur web JS/PHP full-stack à Abidjan. React, Next.js, Laravel, Firebase.",
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
                {/* Spinner de chargement — affiché instantanément, disparaît quand React hydrate */}
                <div
                    id="preloader"
                    style={{
                        position: "fixed",
                        inset: 0,
                        zIndex: 9999,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#0a0a0a",
                        transition: "opacity 0.4s ease, visibility 0.4s ease",
                    }}
                >
                    <span
                        style={{
                            position: "relative",
                            width: 48,
                            height: 48,
                            display: "inline-block",
                        }}
                    />
                </div>
                <style
                    dangerouslySetInnerHTML={{
                        __html: `
                            #preloader span,
                            #preloader span::before,
                            #preloader span::after {
                                position: absolute;
                                left: 0;
                                top: 0;
                                width: 48px;
                                height: 48px;
                                box-sizing: border-box;
                            }
                            #preloader span::before,
                            #preloader span::after {
                                content: "";
                                display: block;
                                border: 32px solid transparent;
                                border-top-color: #fff;
                                animation: weld-rotate 2s infinite ease-in;
                            }
                            #preloader span::before {
                                border-color: transparent transparent transparent #f59e0b;
                                animation-delay: 0.5s;
                            }
                            @keyframes weld-rotate {
                                0%, 25% { transform: rotate(0deg); }
                                50%, 75% { transform: rotate(180deg); }
                                100% { transform: rotate(360deg); }
                            }
                            /* Cacher le preloader une fois le contenu chargé */
                            body.loaded #preloader {
                                opacity: 0;
                                visibility: hidden;
                                pointer-events: none;
                            }
                        `,
                    }}
                />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.addEventListener("load", function() {
                                document.body.classList.add("loaded");
                                setTimeout(function() {
                                    var el = document.getElementById("preloader");
                                    if (el) el.remove();
                                }, 500);
                            });
                        `,
                    }}
                />
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </body>
            <Analytics />
        </html>
    );
}
