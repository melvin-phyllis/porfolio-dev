import { getProfile } from "@/lib/firebase-db"
import { ProfileForm } from "@/components/admin/ProfileForm"

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
    const profile = await getProfile()

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white">Paramètres</h1>
                <p className="text-neutral-400 mt-1">
                    Configuration globale du site, informations de profil et liens sociaux.
                </p>
            </div>

            {/* Form Container */}
            <div className="max-w-4xl">
                <div className="rounded-xl bg-[#111111] border border-[#1f1f1f] p-6">
                    <ProfileForm initialData={profile || undefined} />
                </div>
            </div>
        </div>
    )
}
