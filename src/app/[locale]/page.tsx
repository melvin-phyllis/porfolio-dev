import { Metadata } from "next";
import { getProfile, getProjects, getSkills, getExperiences, Profile, Project, Experience } from "@/lib/firebase-db";
import { translateObject, translateArray } from "@/lib/translate";
import { BreadcrumbSchema } from "@/components/JsonLd";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Timeline from "@/components/sections/Timeline";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";

export const dynamic = "force-dynamic";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://zaerthnh.dev";

    return {
        title: locale === "fr"
            ? "Accueil | Développeur Fullstack"
            : "Home | Fullstack Developer",
        description: locale === "fr"
            ? "Découvrez le portfolio de Akou N'dy Phyllis Melvin, développeur web JS/PHP full-stack junior. Expertise en React, Next.js, Node.js, PHP, Laravel et Firebase."
            : "Discover Akou N'dy Phyllis Melvin's portfolio, junior full-stack web developer. Expertise in React, Next.js, Node.js, PHP, Laravel and Firebase.",
        alternates: {
            canonical: `${baseUrl}/${locale}`,
            languages: {
                fr: `${baseUrl}/fr`,
                en: `${baseUrl}/en`,
            },
        },
        openGraph: {
            url: `${baseUrl}/${locale}`,
            locale: locale === "fr" ? "fr_FR" : "en_US",
        },
    };
}

export default async function Home({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://zaerthnh.dev";

    // Récupérer les données de Firebase
    const [rawProfile, skills, allProjects, allExperiences] = await Promise.all([
        getProfile(),
        getSkills(),
        getProjects(),
        getExperiences(),
    ]);

    // Traduire automatiquement si la locale est anglais
    const profile = rawProfile
        ? await translateObject<Profile>(
            rawProfile,
            ["headline", "subheadline", "about"],
            locale
        )
        : rawProfile;

    const translatedProjects = await translateArray<Project>(
        allProjects,
        ["title", "description"],
        locale
    );

    const translatedExperiences = await translateArray<Experience>(
        allExperiences,
        ["role", "company", "description"],
        locale
    );

    const projects = translatedProjects
        .filter((p) => p.featured)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const experiences = translatedExperiences.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const breadcrumbItems = [
        { name: locale === "fr" ? "Accueil" : "Home", url: `${baseUrl}/${locale}` },
    ];

    return (
        <>
            <BreadcrumbSchema items={breadcrumbItems} />
            <Hero profile={profile} />
            <About
                profile={profile}
                stats={[
                    { value: projects.length, label: "projects" },
                    { value: skills.length, label: "technologies" },
                ]}
            />
            <Skills skills={skills} />
            <Timeline experiences={experiences} />
            <Projects projects={projects} />
            <Services />
            <Testimonials />
            <FAQ />
            <Contact profile={profile} />
        </>
    );
}
