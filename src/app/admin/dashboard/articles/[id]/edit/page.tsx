import { getArticle } from "@/lib/firebase-db";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { notFound } from "next/navigation";

interface EditArticlePageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditArticlePage({ params }: EditArticlePageProps) {
    const { id } = await params;
    const article = await getArticle(id);

    if (!article) {
        notFound();
    }

    const initialData = {
        ...article,
        tags: Array.isArray(article.tags) ? JSON.stringify(article.tags) : article.tags
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Modifier l&apos;article</h1>
                <p className="text-text-muted">
                    Mettez à jour les informations de l&apos;article.
                </p>
            </div>
            <div className="max-w-2xl">
                <ArticleForm initialData={initialData} />
            </div>
        </div>
    );
}
