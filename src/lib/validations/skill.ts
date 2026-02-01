

import { z } from "zod"

export const skillSchema = z.object({
    name: z.string().min(1, "Le nom est requis"),
    category: z.string().min(1, "La catégorie est requise"),
    level: z.number().min(0).max(100),
    icon: z.string().min(1, "L'icône est requise"),
    color: z.string().optional(),
})

export type SkillFormValues = z.infer<typeof skillSchema>
