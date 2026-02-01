import { ExperienceForm } from "@/components/admin/ExperienceForm";

export default function NewExperiencePage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Nouvelle Expérience</h1>
                <p className="text-gray-600 dark:text-neutral-400 mt-1">
                    Ajoutez une expérience professionnelle.
                </p>
            </div>
            <div className="max-w-2xl">
                <ExperienceForm />
            </div>
        </div>
    );
}
