

import { z } from "zod"

export const profileSchema = z.object({
    headline: z.string().min(1, "Le titre est requis"),
    subheadline: z.string().optional(),
    about: z.string().min(10, "La description doit être plus détaillée"),

    github: z.string().url("URL invalide").optional().or(z.literal("")),
    linkedin: z.string().url("URL invalide").optional().or(z.literal("")),
    twitter: z.string().url("URL invalide").optional().or(z.literal("")),
    email: z.string().email("Email invalide").optional().or(z.literal("")),

    resumeUrl: z.string().url("URL invalide").optional().or(z.literal("")),
    image: z.string().optional(),
})

export type ProfileFormValues = z.infer<typeof profileSchema>
