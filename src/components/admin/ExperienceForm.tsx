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
    FormDescription
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

import { ExperienceFormValues, experienceSchema } from "@/lib/validations/experience"
import { createExperience, updateExperience } from "@/app/admin/actions"

interface ExperienceFormProps {
    initialData?: ExperienceFormValues & { id: string }
}

export function ExperienceForm({ initialData }: ExperienceFormProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<ExperienceFormValues>({
        resolver: zodResolver(experienceSchema),
        defaultValues: {
            role: initialData?.role || "",
            company: initialData?.company || "",
            date: initialData?.date || "",
            description: initialData?.description || "",
            current: initialData?.current || false,
        },
    })

    async function onSubmit(data: ExperienceFormValues) {
        setIsLoading(true)
        try {
            if (initialData) {
                await updateExperience(initialData.id, data)
            } else {
                await createExperience(data)
            }
            router.push("/admin/dashboard/experiences")
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
                        {initialData ? "Modifier l'expérience" : "Nouvelle expérience"}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {initialData ? "Mettez à jour les informations" : "Ajoutez une nouvelle expérience professionnelle"}
                    </p>
                </div>
                <Link href="/admin/dashboard/experiences">
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
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700 dark:text-gray-300">Rôle / Poste</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: Développeur Full Stack" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="company"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-700 dark:text-gray-300">Entreprise</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex: Google" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-700 dark:text-gray-300">Période</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ex: 2023 - Présent" {...field} />
                                </FormControl>
                                <FormDescription className="text-gray-500 dark:text-gray-400">
                                    Format libre (ex: Jan 2023 - Dec 2024)
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-700 dark:text-gray-300">Description</FormLabel>
                                <FormControl>
                                    <Textarea 
                                        className="min-h-[120px]" 
                                        placeholder="Responsabilités, réalisations..." 
                                        {...field} 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="current"
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
                                        Poste actuel
                                    </FormLabel>
                                    <FormDescription className="text-gray-500 dark:text-gray-400">
                                        Cochez si vous occupez toujours ce poste.
                                    </FormDescription>
                                </div>
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
                        <Link href="/admin/dashboard/experiences">
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
