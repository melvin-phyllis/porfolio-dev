import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Marie Danielle Akpeuby - Développeuse Fullstack & DevOps",
        short_name: "Marie Danielle",
        description:
            "Portfolio de Marie Danielle Akpeuby - Développeuse Fullstack & DevOps spécialisée en React, Next.js, Node.js, Docker et Kubernetes.",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
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
