import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800"],
    variable: "--font-poppins",
});

export const metadata: Metadata = {
    title: "Marie Danielle Akpeuby | Développeuse Fullstack & DevOps",
    description:
        "Portfolio de Marie Danielle Akpeuby - Développeuse Fullstack & DevOps spécialisée en React, Next.js, Node.js, Docker et Kubernetes.",
    keywords: [
        "développeur fullstack",
        "devops",
        "react",
        "next.js",
        "node.js",
        "docker",
        "kubernetes",
        "côte d'ivoire",
    ],
    authors: [{ name: "Marie Danielle Akpeuby" }],
    openGraph: {
        title: "Marie Danielle Akpeuby | Développeuse Fullstack & DevOps",
        description:
            "Développeuse Fullstack & DevOps créant des applications web modernes et performantes.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr" className="scroll-smooth">
            <body className={`${poppins.variable} font-sans antialiased`}>
                {children}
            </body>
        </html>
    );
}
