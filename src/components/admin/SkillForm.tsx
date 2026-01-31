"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { SkillFormValues, skillSchema } from "@/lib/validations/skill"
import { createSkill, updateSkill } from "@/app/admin/actions"

// List of available icons matching frontend (Skills.tsx)
const iconOptions = [
    { label: "HTML5", value: "SiHtml5" },
    { label: "CSS3", value: "SiCss3" },
    { label: "JavaScript", value: "SiJavascript" },
    { label: "TypeScript", value: "SiTypescript" },
    { label: "React", value: "SiReact" },
    { label: "Redux", value: "SiRedux" },
    { label: "Tailwind CSS", value: "SiTailwindcss" },
    { label: "GSAP", value: "SiGreensock" },
    { label: "Framer Motion", value: "SiFramer" },
    { label: "SASS", value: "SiSass" },
    { label: "Styled Components", value: "SiStyledcomponents" },
    { label: "Next.js", value: "SiNextdotjs" },
    { label: "Node.js", value: "SiNodedotjs" },
    { label: "MongoDB", value: "SiMongodb" },
    { label: "PostgreSQL", value: "SiPostgresql" },
    { label: "Git", value: "SiGit" },
    { label: "Docker", value: "SiDocker" },
    { label: "Figma", value: "SiFigma" },
];

const categories = [
    { label: "Frontend", value: "Frontend" },
    { label: "Backend", value: "Backend" },
    { label: "DevOps", value: "DevOps" },
    { label: "Design", value: "Design" },
    { label: "Other", value: "Other" },
]

interface SkillFormProps {
    initialData?: SkillFormValues & { id: string }
}

export function SkillForm({ initialData }: SkillFormProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    // Fix typing issue by casting defaultValues or schema
    const form = useForm<SkillFormValues>({
        resolver: zodResolver(skillSchema),
        defaultValues: initialData || {
            name: "",
            category: "Frontend",
            level: 0,
            icon: "",
            color: "#ffffff"
        },
    })

    async function onSubmit(data: SkillFormValues) {
        setIsLoading(true)
        try {
            if (initialData) {
                await updateSkill(initialData.id, data)
            } else {
                await createSkill(data)
            }
            router.push("/admin/dashboard/skills")
            router.refresh()
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nom de la compétence</FormLabel>
                            <FormControl>
                                <Input placeholder="Ex: React" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Catégorie</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Choisir une catégorie" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {categories.map((cat) => (
                                            <SelectItem key={cat.value} value={cat.value}>
                                                {cat.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="icon"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Icône (React Icons)</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Choisir une icône" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="max-h-[200px]">
                                        {iconOptions.map((icon) => (
                                            <SelectItem key={icon.value} value={icon.value}>
                                                {icon.label} ({icon.value})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Couleur (Hex)</FormLabel>
                            <FormControl>
                                <div className="flex gap-2">
                                    <Input type="color" className="w-12 p-1 cursor-pointer" {...field} />
                                    <Input placeholder="#ffffff" {...field} />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {initialData ? "Mettre à jour" : "Ajouter la compétence"}
                </Button>
            </form>
        </Form>
    )
}
