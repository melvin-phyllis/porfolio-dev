

import { z } from "zod"

export const skillSchema = z.object({
    name: z.string().min(1, "Le nom est requis"),
    category: z.string().min(1, "La catégorie est requise"), // frontend, backend, etc.
    level: z.coerce.number().min(0).max(100).default(0), // Keep it for compat but might hide it
    icon: z.string().min(1, "L'icône est requise"), // String name of the icon
    color: z.string().optional(), // Hex color
})

export type SkillFormValues = z.infer<typeof skillSchema>
