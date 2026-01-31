import { ExperienceForm } from "@/components/admin/ExperienceForm";

export default function NewExperiencePage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Nouvelle Expérience</h1>
                <p className="text-muted-foreground">
                    Ajoutez une expérience professionnelle.
                </p>
            </div>
            <div className="max-w-2xl">
                <ExperienceForm />
            </div>
        </div>
    );
}
