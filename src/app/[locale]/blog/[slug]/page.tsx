import { Metadata } from "next";
import {
    getArticleBySlug,
    getPublishedArticles,
    incrementArticleViews,
} from "@/lib/firebase-db";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, User, ArrowLeft, Tag } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { ArticleSchema, BreadcrumbSchema } from "@/components/JsonLd";

export const dynamic = "force-dynamic";

interface ArticlePageProps {
    params: Promise<{
        locale: string;
        slug: string;
    }>;
}

export async function generateMetadata({
    params,
}: ArticlePageProps): Promise<Metadata> {
    const { locale, slug } = await params;
    const article = await getArticleBySlug(slug);

    if (!article || !article.published) {
        return {
            title: locale === "fr" ? "Article non trouvé" : "Article not found",
        };
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://melvin-dev.com";
    let tags: string[] = [];
    try {
        tags = JSON.parse(article.tags);
    } catch {
        tags = article.tags.split(",").map((t) => t.trim());
    }

    return {
        title: article.title,
        description: article.excerpt,
        keywords: tags,
        authors: [{ name: article.author }],
        openGraph: {
            title: article.title,
            description: article.excerpt,
            type: "article",
            publishedTime: new Date(article.createdAt).toISOString(),
            modifiedTime: new Date(article.updatedAt || article.createdAt).toISOString(),
            authors: [article.author],
            tags: tags,
            images: article.image
                ? [
                    {
                        url: article.image,
                        alt: article.title,
                    },
                ]
                : undefined,
        },
        twitter: {
            card: "summary_large_image",
            title: article.title,
            description: article.excerpt,
            images: article.image ? [article.image] : undefined,
        },
        alternates: {
            canonical: `${baseUrl}/${locale}/blog/${slug}`,
        },
    };
}

function getReadingTime(content: string) {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
}

function parseMarkdown(content: string): string {
    let html = content
        .replace(
            /^### (.*$)/gim,
            '<h3 class="text-xl font-bold mt-8 mb-4 text-text">$1</h3>'
        )
        .replace(
            /^## (.*$)/gim,
            '<h2 class="text-2xl font-bold mt-10 mb-4 text-text">$1</h2>'
        )
        .replace(
            /^# (.*$)/gim,
            '<h1 class="text-3xl font-bold mt-12 mb-6 text-text">$1</h1>'
        )
        .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold">$1</strong>')
        .replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>')
        .replace(
            /`(.*?)`/gim,
            '<code class="bg-surface-light px-2 py-1 rounded text-sm font-mono">$1</code>'
        )
        .replace(
            /```(\w+)?\n([\s\S]*?)```/gim,
            '<pre class="bg-surface-light p-4 rounded-lg overflow-x-auto my-6"><code class="text-sm font-mono">$2</code></pre>'
        )
        .replace(
            /\[([^\]]+)\]\(([^)]+)\)/gim,
            '<a href="$2" class="text-primary hover:underline" target="_blank" rel="noopener noreferrer">$1</a>'
        )
        .replace(/^- (.*$)/gim, '<li class="ml-4 list-disc text-text-muted">$1</li>')
        .replace(/^\d+\. (.*$)/gim, '<li class="ml-4 list-decimal text-text-muted">$1</li>')
        .replace(
            /\n\n/gim,
            '</p><p class="text-text-muted leading-relaxed mb-4">'
        )
        .replace(/\n/gim, "<br/>");

    return `<p class="text-text-muted leading-relaxed mb-4">${html}</p>`;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
    const { locale, slug } = await params;
    const t = await getTranslations("blog");
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://melvin-dev.com";

    const article = await getArticleBySlug(slug);

    if (!article || !article.published) {
        notFound();
    }

    await incrementArticleViews(article.id);

    const relatedArticles = (await getPublishedArticles())
        .filter((a) => a.id !== article.id && a.category === article.category)
        .slice(0, 3);

    let tags: string[] = [];
    try {
        tags = JSON.parse(article.tags);
    } catch {
        tags = article.tags.split(",").map((t) => t.trim());
    }

    const breadcrumbItems = [
        { name: locale === "fr" ? "Accueil" : "Home", url: `${baseUrl}/${locale}` },
        { name: "Blog", url: `${baseUrl}/${locale}/blog` },
        { name: article.title, url: `${baseUrl}/${locale}/blog/${slug}` },
    ];

    return (
        <>
            <ArticleSchema
                headline={article.title}
                description={article.excerpt}
                image={article.image || `${baseUrl}/og-image.png`}
                datePublished={new Date(article.createdAt).toISOString()}
                dateModified={new Date(article.updatedAt || article.createdAt).toISOString()}
                authorName={article.author}
                url={`${baseUrl}/${locale}/blog/${slug}`}
                keywords={tags}
            />
            <BreadcrumbSchema items={breadcrumbItems} />

            <article className="min-h-screen pt-32 pb-20">
                <div className="max-w-4xl mx-auto px-4">
                    <Link
                        href={`/${locale}/blog`}
                        className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-8"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        {t("backToBlog")}
                    </Link>

                    <header className="space-y-6 mb-12">
                        <div className="flex flex-wrap items-center gap-4">
                            <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                                {article.category}
                            </span>
                            <time
                                dateTime={new Date(article.createdAt).toISOString()}
                                className="text-text-muted text-sm flex items-center gap-1"
                            >
                                <Calendar className="h-4 w-4" />
                                {new Date(article.createdAt).toLocaleDateString(locale, {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </time>
                            <span className="text-text-muted text-sm flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {getReadingTime(article.content)} min
                            </span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl font-bold text-text leading-tight">
                            {article.title}
                        </h1>

                        <p className="text-xl text-text-muted">{article.excerpt}</p>

                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <User className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <p className="font-medium text-text">{article.author}</p>
                                <p className="text-sm text-text-muted">{t("author")}</p>
                            </div>
                        </div>
                    </header>

                    {article.image && (
                        <figure className="relative h-[400px] rounded-2xl overflow-hidden mb-12">
                            <Image
                                src={article.image}
                                alt={article.title}
                                fill
                                className="object-cover"
                                priority
                                sizes="100vw"
                            />
                        </figure>
                    )}

                    <div
                        className="prose prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: parseMarkdown(article.content) }}
                    />

                    {tags.length > 0 && (
                        <footer className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border">
                            <Tag className="h-4 w-4 text-text-muted" />
                            {tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 bg-surface text-text-muted text-sm rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </footer>
                    )}

                    {relatedArticles.length > 0 && (
                        <aside className="mt-16 pt-12 border-t border-border">
                            <h2 className="text-2xl font-bold text-text mb-8">
                                {t("relatedArticles")}
                            </h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {relatedArticles.map((related) => (
                                    <Link
                                        key={related.id}
                                        href={`/${locale}/blog/${related.slug}`}
                                        className="group"
                                    >
                                        <article className="bg-surface border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all">
                                            <div className="relative h-32 bg-surface-light">
                                                {related.image ? (
                                                    <Image
                                                        src={related.image}
                                                        alt={related.title}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform"
                                                        sizes="(max-width: 768px) 100vw, 300px"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <Tag className="h-8 w-8 text-text-muted" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-medium text-text group-hover:text-primary transition-colors line-clamp-2">
                                                    {related.title}
                                                </h3>
                                            </div>
                                        </article>
                                    </Link>
                                ))}
                            </div>
                        </aside>
                    )}
                </div>
            </article>
        </>
    );
}
