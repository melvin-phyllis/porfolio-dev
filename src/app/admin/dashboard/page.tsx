import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Eye, FolderGit2, Briefcase } from "lucide-react";
import { PrismaClient } from "@prisma/client";
import { OverviewChart } from "@/components/admin/OverviewChart";

// In a real app, use a singleton prisma client
const prisma = new PrismaClient();

export default async function DashboardPage() {
    // Fetch stats (Mocked for now or real counts)
    // Since we just seeded, counts might be low
    const projectCount = await prisma.project.count();
    const skillCount = await prisma.skill.count();
    const experienceCount = await prisma.experience.count();
    const visitCount = 1245; // Mock value for now

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                    Vue d'ensemble de votre portfolio et statistiques.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Vues Totales</CardTitle>
                        <Eye className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{visitCount}+</div>
                        <p className="text-xs text-muted-foreground">
                            +20.1% par rapport au mois dernier
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Projets</CardTitle>
                        <FolderGit2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{projectCount}</div>
                        <p className="text-xs text-muted-foreground">
                            Projets publiés
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Compétences</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{skillCount}</div>
                        <p className="text-xs text-muted-foreground">
                            Technologies maîtrisées
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Expériences</CardTitle>
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{experienceCount}</div>
                        <p className="text-xs text-muted-foreground">
                            Postes occupés
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Chart */}
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Aperçu des visites (2024)</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                    <OverviewChart />
                </CardContent>
            </Card>
        </div>
    );
}
