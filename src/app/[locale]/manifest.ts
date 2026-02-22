import { MetadataRoute } from "next";

// Duplicate manifest for localized routes (/fr, /en)
// to avoid 404 on /fr/manifest.webmanifest
export default function manifest(): MetadataRoute.Manifest {
    return {
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
}
