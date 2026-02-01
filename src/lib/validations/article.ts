import { z } from "zod"

export const articleSchema = z.object({
    title: z.string().min(5, {
        message: "Le titre doit contenir au moins 5 caractères.",
    }),
    slug: z.string().min(3, {
        message: "Le slug doit contenir au moins 3 caractères.",
    }).regex(/^[a-z0-9-]+$/, {
        message: "Le slug ne peut contenir que des lettres minuscules, chiffres et tirets.",
    }),
    excerpt: z.string().min(10, {
        message: "L'extrait doit contenir au moins 10 caractères.",
    }).max(200, {
        message: "L'extrait ne peut pas dépasser 200 caractères.",
    }),
    content: z.string().min(50, {
        message: "Le contenu doit contenir au moins 50 caractères.",
    }),
    image: z.string().optional(),
    category: z.string().min(1, {
        message: "La catégorie est requise.",
    }),
    tags: z.string().min(2, {
        message: "Entrez au moins un tag (séparés par des virgules).",
    }),
    author: z.string().min(1, {
        message: "L'auteur est requis.",
    }),
    published: z.boolean(),
    featured: z.boolean(),
})

export type ArticleFormValues = z.infer<typeof articleSchema>

export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_]+/g, "-")
        .replace(/^-+|-+$/g, "")
}
