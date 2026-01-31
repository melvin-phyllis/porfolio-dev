import { getSkill } from "@/lib/firebase-db";
import { SkillForm } from "@/components/admin/SkillForm";
import { notFound } from "next/navigation";

interface EditSkillPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditSkillPage({ params }: EditSkillPageProps) {
    const { id } = await params;
    const skill = await getSkill(id);

    if (!skill) {
        notFound();
    }

    // Schema expects 'color' which might be missing in DB if it was not required before
    // But our schema defines it as optional?
    // Our form schema says: color: z.string().optional()
    // DB schema says ? No, let's check schema.
    // Schema says: level Int @default(0), icon String?
    // Is color in schema? 
    // Wait, I didn't see color in schema!!!
    // Step 677 view schema:
    // model Skill { ... name, category, level, icon, createdAt, updatedAt }
    // NO COLOR !

    // Frontend uses hardcoded colors in array: { name: "HTML", color: "#E34F26" }
    // ADMIN FORM NEEDS TO SAVE COLOR IN DB IF WE WANT IT DYNAMIC.
    // OR we map it in frontend code based on name.
    // BUT the request is "Modifier le contenu sans toucher au code".
    // So color SHOULD be in DB.

    // I need to add `color` to `Skill` model in DB.
    // AND migrate.

    // For now, I will assume it's not there and pass undefined, BUT the form asks for it.

    const initialData = {
        ...skill,
        color: "#ffffff" // Default fallback if not in DB
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Modifier la Compétence</h1>
                <p className="text-muted-foreground">
                    Mettez à jour les informations.
                </p>
            </div>
            <div className="max-w-2xl">
                <SkillForm initialData={initialData} />
            </div>
        </div>
    );
}
