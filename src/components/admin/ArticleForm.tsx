"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Loader2, Save, X, ArrowLeft, Eye, EyeOff } from "lucide-react"
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
import { ArticleFormValues, articleSchema, generateSlug } from "@/lib/validations/article"
import { createArticle, updateArticle } from "@/app/admin/actions"

interface ArticleFormProps {
    initialData?: ArticleFormValues & { id: string }
}

export function ArticleForm({ initialData }: ArticleFormProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [isSavingDraft, setIsSavingDraft] = useState(false)

    const form = useForm<ArticleFormValues>({
        resolver: zodResolver(articleSchema),
        defaultValues: initialData || {
            title: "",
            slug: "",
            excerpt: "",
            content: "",
            image: "",
            category: "",
            tags: "",
            author: "",
            published: false,
            featured: false,
        },
    })

    const watchTitle = form.watch("title")

    useEffect(() => {
        if (!initialData && watchTitle) {
            const newSlug = generateSlug(watchTitle)
            form.setValue("slug", newSlug)
        }
    }, [watchTitle, initialData, form])

    async function onSubmit(data: ArticleFormValues) {
        setIsLoading(true)
        try {
            if (initialData) {
                await updateArticle(initialData.id, data)
            } else {
                await createArticle(data)
            }
            router.push("/admin/dashboard/articles")
            router.refresh()
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    async function saveDraft() {
        setIsSavingDraft(true)
        const data = form.getValues()
        data.published = false
        try {
            if (initialData) {
                await updateArticle(initialData.id, data)
            } else {
                await createArticle(data)
            }
            router.push("/admin/dashboard/articles")
            router.refresh()
        } catch (error) {
            console.error(error)
        } finally {
            setIsSavingDraft(false)
        }
    }

    return (
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-gray-800">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                        {initialData ? "Modifier l'article" : "Nouvel article"}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {initialData ? "Mettez à jour le contenu de l'article" : "Rédigez un nouvel article pour votre blog"}
                    </p>
                </div>
                <Link href="/admin/dashboard/articles">
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
                                    <FormLabel className="text-gray-700 dark:text-gray-300">Titre de l&apos;article</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Mon article sur..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700 dark:text-gray-300">Slug (URL)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="mon-article-sur" {...field} />
                                    </FormControl>
                                    <FormDescription className="text-gray-500 dark:text-gray-400">
                                        Auto-généré depuis le titre
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="excerpt"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-700 dark:text-gray-300">Extrait</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Résumé court de l'article..."
                                        {...field}
                                        maxLength={200}
                                        className="min-h-[80px]"
                                    />
                                </FormControl>
                                <FormDescription className="text-gray-500 dark:text-gray-400">
                                    {field.value?.length || 0}/200 caractères
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-700 dark:text-gray-300">Contenu (Markdown)</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="# Introduction&#10;&#10;Votre contenu en Markdown..."
                                        {...field}
                                        className="min-h-[300px] font-mono text-sm"
                                    />
                                </FormControl>
                                <FormDescription className="text-gray-500 dark:text-gray-400">
                                    Utilisez la syntaxe Markdown pour formater votre article
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid gap-6 md:grid-cols-3">
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700 dark:text-gray-300">Catégorie</FormLabel>
                                    <FormControl>
                                        <Input placeholder="ex: Tutoriel" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="author"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700 dark:text-gray-300">Auteur</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Marie Danielle" {...field} />
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
                                    <FormLabel className="text-gray-700 dark:text-gray-300">Tags</FormLabel>
                                    <FormControl>
                                        <Input placeholder="React, Next.js" {...field} />
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
                                <FormLabel className="text-gray-700 dark:text-gray-300">Image de couverture</FormLabel>
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

                    <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="published"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-xl border border-success-200 dark:border-success-800 p-4 bg-success-50 dark:bg-success-500/10">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel className="text-success-700 dark:text-success-400 flex items-center gap-2">
                                            <Eye className="h-4 w-4" />
                                            Publier
                                        </FormLabel>
                                        <FormDescription className="text-success-600/70 dark:text-success-400/70">
                                            L&apos;article sera visible sur le blog
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="featured"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-xl border border-warning-200 dark:border-warning-800 p-4 bg-warning-50 dark:bg-warning-500/10">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel className="text-warning-700 dark:text-orange-400 flex items-center gap-2">
                                            Mettre à la une
                                        </FormLabel>
                                        <FormDescription className="text-warning-600/70 dark:text-orange-400/70">
                                            Afficher sur la page d&apos;accueil
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                        <Button 
                            type="submit" 
                            variant="success"
                            disabled={isLoading || isSavingDraft}
                        >
                            {isLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Save className="mr-2 h-4 w-4" />
                            )}
                            {initialData ? "Mettre à jour" : "Publier"}
                        </Button>
                        <Button 
                            type="button" 
                            variant="secondary"
                            disabled={isLoading || isSavingDraft}
                            onClick={saveDraft}
                        >
                            {isSavingDraft ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <EyeOff className="mr-2 h-4 w-4" />
                            )}
                            Sauvegarder brouillon
                        </Button>
                        <Link href="/admin/dashboard/articles">
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
