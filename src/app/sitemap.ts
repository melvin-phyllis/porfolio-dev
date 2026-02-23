import { getPublishedArticles, getProjects } from "@/lib/firebase-db";
import { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://melvin-dev.com";
    const locales = ["fr", "en"];

    // Pages statiques
    const staticPages = [
        { path: "", priority: 1.0, freq: "daily" as const },
        { path: "/blog", priority: 0.8, freq: "weekly" as const },
    ];

    const staticUrls = locales.flatMap((locale) =>
        staticPages.map((page) => ({
            url: `${baseUrl}/${locale}${page.path}`,
            lastModified: new Date(),
            changeFrequency: page.freq,
            priority: page.priority,
        }))
    );

    // Articles de blog
    const articles = await getPublishedArticles();
    const articleUrls = articles.flatMap((article) =>
        locales.map((locale) => ({
            url: `${baseUrl}/${locale}/blog/${article.slug}`,
            lastModified: new Date(article.updatedAt || article.createdAt),
            changeFrequency: "weekly" as const,
            priority: 0.7,
        }))
    );

    // Projets
    const projects = await getProjects();
    const projectUrls = projects.flatMap((project) =>
        locales.map((locale) => ({
            url: `${baseUrl}/${locale}/projects/${project.id}`,
            lastModified: new Date(project.updatedAt),
            changeFrequency: "monthly" as const,
            priority: 0.6,
        }))
    );

    return [...staticUrls, ...articleUrls, ...projectUrls];
}
