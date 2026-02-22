import { NextResponse } from "next/server";

// Serve manifest.webmanifest for localized routes (e.g. /fr/manifest.webmanifest)
// to avoid 404 errors from browsers loading manifest relative to locale URL
export async function GET() {
    const manifest = {
        name: "Akou N'dy Phyllis Melvin - Développeur Web JS/PHP Full-Stack Junior",
        short_name: "Phyllis Melvin",
        description:
            "Portfolio de Akou N'dy Phyllis Melvin - Développeur Web JS/PHP Full-Stack Junior spécialisé en React, Next.js, Node.js, PHP, Laravel et Firebase.",
        start_url: "/",
        display: "standalone",
        background_color: "#000000",
        theme_color: "#f59e0b",
        icons: [
            {
                src: "/favicon.ico",
                sizes: "any",
                type: "image/x-icon",
            },
        ],
        lang: "fr",
        dir: "ltr",
        orientation: "portrait",
        categories: ["portfolio", "technology", "web development"],
    };

    return new NextResponse(JSON.stringify(manifest), {
        headers: {
            "Content-Type": "application/manifest+json",
            "Cache-Control": "public, max-age=86400",
        },
    });
}
