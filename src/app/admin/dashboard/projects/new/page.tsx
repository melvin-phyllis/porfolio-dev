import { ProjectForm } from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Nouveau Projet</h1>
                <p className="text-gray-600 dark:text-neutral-400 mt-1">
                    Ajoutez un projet à votre portfolio.
                </p>
            </div>
            <div className="max-w-2xl">
                <ProjectForm />
            </div>
        </div>
    );
}
