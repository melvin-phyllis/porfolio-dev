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

    // Ensure defaultValues matches the schema type exactly
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
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Rôle / Poste</FormLabel>
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
                                <FormLabel>Entreprise</FormLabel>
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
                            <FormLabel>Période</FormLabel>
                            <FormControl>
                                <Input placeholder="Ex: 2023 - Présent" {...field} />
                            </FormControl>
                            <FormDescription>Format libre (ex: Jan 2023 - Dec 2024)</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea className="min-h-[120px]" placeholder="Responsabilités, réalisations..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="current"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                    Poste actuel
                                </FormLabel>
                                <FormDescription>
                                    Cochez si vous occupez toujours ce poste.
                                </FormDescription>
                            </div>
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {initialData ? "Mettre à jour" : "Ajouter l'expérience"}
                </Button>
            </form>
        </Form>
    )
}
