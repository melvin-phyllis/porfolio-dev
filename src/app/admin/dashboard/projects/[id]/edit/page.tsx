import { getProject } from "@/lib/firebase-db";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { notFound } from "next/navigation";

interface EditProjectPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
    const { id } = await params;
    const project = await getProject(id);

    if (!project) {
        notFound();
    }

    // Convert tags array back to string for the form (which expects string input)
    // My getProject helper returns tags as string[] if stored as JSON string.
    // The form zod schema expects string.
    const initialData = {
        ...project,
        tags: Array.isArray(project.tags) ? JSON.stringify(project.tags) : project.tags
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Modifier le Projet</h1>
                <p className="text-muted-foreground">
                    Mettez à jour les informations du projet.
                </p>
            </div>
            <div className="max-w-2xl">
                <ProjectForm initialData={initialData} />
            </div>
        </div>
    );
}
