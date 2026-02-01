import { ArticleForm } from "@/components/admin/ArticleForm"

export default function NewArticlePage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Nouvel article</h1>
                <p className="text-gray-600 dark:text-neutral-400 mt-1">
                    Créez un nouvel article pour votre blog.
                </p>
            </div>
            <div className="max-w-2xl">
                <ArticleForm />
            </div>
        </div>
    )
}
