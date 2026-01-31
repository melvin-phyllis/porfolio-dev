import { getExperience } from "@/lib/firebase-db";
import { ExperienceForm } from "@/components/admin/ExperienceForm";
import { notFound } from "next/navigation";

interface EditExperiencePageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditExperiencePage({ params }: EditExperiencePageProps) {
    const { id } = await params;
    const experience = await getExperience(id);

    if (!experience) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Modifier l'Expérience</h1>
                <p className="text-muted-foreground">
                    Mettez à jour les informations.
                </p>
            </div>
            <div className="max-w-2xl">
                <ExperienceForm initialData={experience} />
            </div>
        </div>
    );
}
