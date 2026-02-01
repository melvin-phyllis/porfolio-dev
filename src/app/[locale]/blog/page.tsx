"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Calendar, Clock, ArrowRight, Search, Tag } from "lucide-react";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

interface Article {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    image: string;
    category: string;
    tags: string;
    author: string;
    published: boolean;
    createdAt: string;
}

export default function BlogPage() {
    const t = useTranslations("blog");
    const locale = useLocale();
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        async function fetchArticles() {
            try {
                const res = await fetch("/api/articles");
                if (res.ok) {
                    const data = await res.json();
                    setArticles(data.filter((a: Article) => a.published));
                }
            } catch (error) {
                console.error("Failed to fetch articles:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchArticles();
    }, []);

    const categories = ["all", ...new Set(articles.map((a) => a.category))];

    const filteredArticles = articles
        .filter((a) => activeCategory === "all" || a.category === activeCategory)
        .filter(
            (a) =>
                a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                a.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const getReadingTime = (content: string) => {
        const wordsPerMinute = 200;
        const words = content.split(/\s+/).length;
        return Math.ceil(words / wordsPerMinute);
    };

    return (
        <section className="section min-h-screen pt-32">
            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="space-y-12"
                >
                    {/* Header avec balises SEO */}
                    <motion.div variants={fadeInUp} className="text-center space-y-4">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                            <span className="gradient-text">{t("title")}</span>
                        </h1>
                        <p className="text-text-muted text-lg max-w-2xl mx-auto">
                            {t("subtitle")}
                        </p>
                    </motion.div>

                    {/* Search & Filter */}
                    <motion.div
                        variants={fadeInUp}
                        className="flex flex-col md:flex-row gap-4 justify-between items-center"
                    >
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                            <input
                                type="text"
                                placeholder={t("search")}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                                aria-label={t("search")}
                            />
                        </div>

                        <nav aria-label="Categories">
                            <div className="flex flex-wrap gap-2 justify-center">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setActiveCategory(category)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                                            activeCategory === category
                                                ? "bg-primary text-background"
                                                : "bg-surface border border-border text-text-muted hover:border-primary"
                                        }`}
                                        aria-pressed={activeCategory === category}
                                    >
                                        {category === "all" ? t("allCategories") : category}
                                    </button>
                                ))}
                            </div>
                        </nav>
                    </motion.div>

                    {/* Articles Grid */}
                    {loading ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="animate-pulse">
                                    <div className="bg-surface rounded-xl h-48 mb-4" />
                                    <div className="h-4 bg-surface rounded w-1/4 mb-2" />
                                    <div className="h-6 bg-surface rounded w-3/4 mb-2" />
                                    <div className="h-4 bg-surface rounded w-full" />
                                </div>
                            ))}
                        </div>
                    ) : filteredArticles.length === 0 ? (
                        <motion.div variants={fadeInUp} className="text-center py-12">
                            <p className="text-text-muted text-lg">{t("noArticles")}</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            variants={staggerContainer}
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredArticles.map((article) => (
                                <motion.article
                                    key={article.id}
                                    variants={staggerItem}
                                    whileHover={{ y: -8 }}
                                    className="group"
                                >
                                    <Link
                                        href={`/${locale}/blog/${article.slug}`}
                                        className="block h-full"
                                    >
                                        <article className="bg-surface border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all h-full flex flex-col">
                                            <div className="relative h-48 overflow-hidden bg-background">
                                                {article.image ? (
                                                    <Image
                                                        src={article.image}
                                                        alt={article.title}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-surface-light">
                                                        <Tag className="h-12 w-12 text-text-muted" />
                                                    </div>
                                                )}
                                                <div className="absolute top-4 left-4">
                                                    <span className="px-3 py-1 bg-primary/90 text-background text-xs font-medium rounded-full">
                                                        {article.category}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="p-6 space-y-3 flex-1 flex flex-col">
                                                <div className="flex items-center gap-4 text-xs text-text-muted">
                                                    <time
                                                        dateTime={article.createdAt}
                                                        className="flex items-center gap-1"
                                                    >
                                                        <Calendar className="h-3 w-3" />
                                                        {new Date(
                                                            article.createdAt
                                                        ).toLocaleDateString(locale, {
                                                            day: "numeric",
                                                            month: "short",
                                                            year: "numeric",
                                                        })}
                                                    </time>
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="h-3 w-3" />
                                                        {getReadingTime(article.excerpt)} min
                                                    </span>
                                                </div>

                                                <h2 className="text-xl font-bold text-text group-hover:text-primary transition-colors line-clamp-2">
                                                    {article.title}
                                                </h2>

                                                <p className="text-text-muted text-sm line-clamp-2 flex-1">
                                                    {article.excerpt}
                                                </p>

                                                <div className="flex items-center gap-2 text-primary text-sm font-medium pt-2">
                                                    {t("readMore")}
                                                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        </article>
                                    </Link>
                                </motion.article>
                            ))}
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
