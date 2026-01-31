

import { z } from "zod"

export const projectSchema = z.object({
    title: z.string().min(2, {
        message: "Le titre doit contenir au moins 2 caractères.",
    }),
    description: z.string().min(10, {
        message: "La description doit contenir au moins 10 caractères.",
    }),
    tags: z.string().min(2, {
        message: "Entrez au moins un tag (séparés par des virgules pour l'instant, ou JSON)."
    }),
    // For simplicity MVP: tags as comma separated string input, converted to JSON array on server
    link: z.string().optional(),
    github: z.string().optional(),
    image: z.string().optional(),
    featured: z.boolean(),
    category: z.string().min(1, {
        message: "La catégorie est requise.",
    }),
})

export type ProjectFormValues = z.infer<typeof projectSchema>
