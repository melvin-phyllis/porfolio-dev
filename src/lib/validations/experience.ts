

import { z } from "zod"

export const experienceSchema = z.object({
    role: z.string().min(1, "Le rôle est requis"),
    company: z.string().min(1, "L'entreprise est requise"),
    date: z.string().min(1, "La date est requise (ex: 2023 - Présent)"),
    description: z.string().min(1, "La description est requise"),
    current: z.boolean(),
})

export type ExperienceFormValues = z.infer<typeof experienceSchema>
