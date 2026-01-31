import { getProfile } from "@/lib/firebase-db"
import { ProfileForm } from "@/components/admin/ProfileForm"

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
    const profile = await getProfile()

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
                <p className="text-muted-foreground">
                    Configuration globale du site, informations de profil et liens sociaux.
                </p>
            </div>

            <div className="max-w-4xl">
                <ProfileForm initialData={profile || undefined} />
            </div>
        </div>
    )
}
