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
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ImageUpload } from "@/components/ui/image-upload"
import { ProjectFormValues, projectSchema } from "@/lib/validations/project"
import { createProject, updateProject } from "@/app/admin/actions"

interface ProjectFormProps {
    initialData?: ProjectFormValues & { id: string }
}

export function ProjectForm({ initialData }: ProjectFormProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<ProjectFormValues>({
        resolver: zodResolver(projectSchema),
        defaultValues: initialData || {
            title: "",
            description: "",
            tags: "",
            category: "",
            link: "",
            github: "",
            image: "",
            featured: false,
        },
    })

    async function onSubmit(data: ProjectFormValues) {
        setIsLoading(true)
        try {
            if (initialData) {
                await updateProject(initialData.id, data)
            } else {
                await createProject(data)
            }
            router.push("/admin/dashboard/projects")
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
                        {initialData ? "Modifier le projet" : "Nouveau projet"}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {initialData ? "Mettez à jour les informations du projet" : "Remplissez les informations pour créer un nouveau projet"}
                    </p>
                </div>
                <Link href="/admin/dashboard/projects">
                    <Button variant="ghost" size="sm">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour
                    </Button>
                </Link>
            </div>

            {/* Form */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700 dark:text-gray-300">Titre du projet</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Mon Super Projet" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700 dark:text-gray-300">Catégorie</FormLabel>
                                    <FormControl>
                                        <Input placeholder="ex: Fullstack, Frontend, Backend" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-700 dark:text-gray-300">Description</FormLabel>
                                <FormControl>
                                    <Textarea 
                                        placeholder="Description détaillée du projet..." 
                                        className="min-h-[120px]"
                                        {...field} 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-700 dark:text-gray-300">Technologies</FormLabel>
                                <FormControl>
                                    <Input placeholder='["React", "Next.js"] ou React, Next.js' {...field} />
                                </FormControl>
                                <FormDescription className="text-gray-500 dark:text-gray-400">
                                    Liste des technologies utilisées (JSON ou séparées par virgules)
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid gap-6 md:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="link"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700 dark:text-gray-300">Lien Demo</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="github"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700 dark:text-gray-300">Lien GitHub</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://github.com/..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-700 dark:text-gray-300">Image du projet</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value}
                                        onChange={field.onChange}
                                        onRemove={() => field.onChange("")}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="featured"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-xl border border-gray-200 dark:border-gray-800 p-4 bg-gray-50 dark:bg-white/2">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel className="text-gray-800 dark:text-white/90">
                                        Mettre à la une
                                    </FormLabel>
                                    <FormDescription className="text-gray-500 dark:text-gray-400">
                                        Ce projet apparaîtra en premier sur le portfolio.
                                    </FormDescription>
                                </div>
                            </FormItem>
                        )}
                    />

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                        <Button 
                        className="bg-green-200"
                            type="submit" 
                            variant="success"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Save className="mr-2 h-4 w-4" />
                            )}
                            {initialData ? "Mettre à jour" : "Créer le projet"}
                        </Button>
                        <Link href="/admin/dashboard/projects">
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
