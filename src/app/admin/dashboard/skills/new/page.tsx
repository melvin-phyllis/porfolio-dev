import { SkillForm } from "@/components/admin/SkillForm";

export default function NewSkillPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Nouvelle Compétence</h1>
                <p className="text-gray-600 dark:text-neutral-400 mt-1">
                    Ajoutez une compétence technologique.
                </p>
            </div>
            <div className="max-w-2xl">
                <SkillForm />
            </div>
        </div>
    );
}
