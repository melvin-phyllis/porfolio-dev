import { getProjects } from "@/lib/firebase-db"
import { columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"

export const dynamic = "force-dynamic"; // Firebase Admin SDK isn't playing well with static gen sometimes

export default async function ProjectsPage() {
    const data = await getProjects()

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Projets</h1>
                <Button asChild>
                    <Link href="/admin/dashboard/projects/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Ajouter un projet
                    </Link>
                </Button>
            </div>

            <DataTable columns={columns} data={data} />
        </div>
    )
}
