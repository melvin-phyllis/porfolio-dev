"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Loader2, Save, X, ArrowLeft } from "lucide-react"
import Link from "next/link"

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
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-gray-800">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                        {initialData ? "Modifier la compétence" : "Nouvelle compétence"}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {initialData ? "Mettez à jour les informations" : "Ajoutez une nouvelle compétence à votre portfolio"}
                    </p>
                </div>
                <Link href="/admin/dashboard/skills">
                    <Button variant="ghost" size="sm">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour
                    </Button>
                </Link>
            </div>

            {/* Form */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-700 dark:text-gray-300">Nom de la compétence</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ex: React" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid gap-6 md:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700 dark:text-gray-300">Catégorie</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="bg-white dark:bg-white/3 border-gray-200 dark:border-gray-800">
                                                <SelectValue placeholder="Choisir une catégorie" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                                            {categories.map((cat) => (
                                                <SelectItem key={cat.value} value={cat.value} className="text-gray-700 dark:text-gray-300">
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
                                    <FormLabel className="text-gray-700 dark:text-gray-300">Icône (React Icons)</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger className="bg-white dark:bg-white/3 border-gray-200 dark:border-gray-800">
                                                <SelectValue placeholder="Choisir une icône" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="max-h-[200px] bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
                                            {iconOptions.map((icon) => (
                                                <SelectItem key={icon.value} value={icon.value} className="text-gray-700 dark:text-gray-300">
                                                    {icon.label}
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
                                <FormLabel className="text-gray-700 dark:text-gray-300">Couleur</FormLabel>
                                <FormControl>
                                    <div className="flex gap-3">
                                        <Input 
                                            type="color" 
                                            className="w-14 h-11 p-1.5 cursor-pointer rounded-lg border-gray-200 dark:border-gray-800" 
                                            {...field} 
                                        />
                                        <Input 
                                            placeholder="#ffffff" 
                                            className="flex-1"
                                            {...field} 
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                        <Button 
                            type="submit" 
                            variant="success"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Save className="mr-2 h-4 w-4" />
                            )}
                            {initialData ? "Mettre à jour" : "Ajouter"}
                        </Button>
                        <Link href="/admin/dashboard/skills">
                            <Button type="button" variant="outline">
                                <X className="mr-2 h-4 w-4" />
                                Annuler
                            </Button>
                        </Link>
                    </div>
                </form>
            </Form>
        </div>
    )
}
