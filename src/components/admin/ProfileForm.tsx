"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Loader2, Save } from "lucide-react"

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
import { FileUpload } from "@/components/ui/file-upload"

import { ProfileFormValues, profileSchema } from "@/lib/validations/profile"
import { updateProfile } from "@/app/admin/actions"

interface ProfileFormProps {
    initialData?: ProfileFormValues & { id?: string }
}

export function ProfileForm({ initialData }: ProfileFormProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            headline: initialData?.headline || "",
            subheadline: initialData?.subheadline || "",
            about: initialData?.about || "",
            github: initialData?.github || "",
            linkedin: initialData?.linkedin || "",
            twitter: initialData?.twitter || "",
            email: initialData?.email || "",
            resumeUrl: initialData?.resumeUrl || "",
            image: initialData?.image || "",
        },
    })

    async function onSubmit(data: ProfileFormValues) {
        setIsLoading(true)
        try {
            await updateProfile(data)
            router.refresh()
            // Could add toast here
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid gap-6 border p-4 rounded-lg bg-card text-card-foreground shadow-sm">
                    <h2 className="text-xl font-semibold">Informations Générales (Hero)</h2>
                    <FormField
                        control={form.control}
                        name="headline"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Titre Principal</FormLabel>
                                <FormControl>
                                    <Input placeholder="Développeuse Full Stack..." {...field} />
                                </FormControl>
                                <FormDescription>C'est ce qui apparaît en gros sur la page d'accueil.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="subheadline"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Sous-titre / Slogan</FormLabel>
                                <FormControl>
                                    <Input placeholder="Créatrice d'expériences web..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid gap-6 border p-4 rounded-lg bg-card text-card-foreground shadow-sm">
                    <h2 className="text-xl font-semibold">À Propos</h2>
                    <FormField
                        control={form.control}
                        name="about"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description Complète</FormLabel>
                                <FormControl>
                                    <Textarea className="min-h-[150px]" placeholder="Je suis une passionnée de..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid gap-6 border p-4 rounded-lg bg-card text-card-foreground shadow-sm">
                    <h2 className="text-xl font-semibold">Réseaux Sociaux & Contact</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email de contact</FormLabel>
                                    <FormControl>
                                        <Input placeholder="contact@example.com" {...field} />
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
                                    <FormLabel>GitHub URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://github.com/..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="linkedin"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>LinkedIn URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://linkedin.com/in/..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="twitter"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Twitter / X URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://twitter.com/..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="grid gap-6 border p-4 rounded-lg bg-card text-card-foreground shadow-sm">
                    <h2 className="text-xl font-semibold">Image de Profil</h2>
                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Photo de profil</FormLabel>
                                <FormControl>
                                    <FileUpload
                                        value={field.value}
                                        onChange={field.onChange}
                                        onRemove={() => field.onChange("")}
                                        type="image"
                                    />
                                </FormControl>
                                <FormDescription>Utilisée dans la section Hero.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid gap-6 border p-4 rounded-lg bg-card text-card-foreground shadow-sm">
                    <h2 className="text-xl font-semibold">Fichiers</h2>
                    <FormField
                        control={form.control}
                        name="resumeUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Fichier CV (PDF)</FormLabel>
                                <FormControl>
                                    <FileUpload
                                        value={field.value}
                                        onChange={field.onChange}
                                        onRemove={() => field.onChange("")}
                                        type="pdf"
                                        accept="application/pdf"
                                    />
                                </FormControl>
                                <FormDescription>Téléversez votre CV au format PDF.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    <Save className="mr-2 h-4 w-4" />
                    Enregistrer les modifications
                </Button>
            </form>
        </Form>
    )
}
