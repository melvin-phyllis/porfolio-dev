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
            ? "Melvin Akou | Développeur Web JS/PHP Full-Stack Junior — Portfolio"
            : "Melvin Akou | Junior Full-Stack JS/PHP Web Developer — Portfolio",
        description: locale === "fr"
            ? "Portfolio de Melvin Akou (Melvyn), développeur web JavaScript & PHP full-stack junior basé à Abidjan, Côte d'Ivoire. Projets React, Next.js, Node.js, Laravel, Firebase. Création d'applications web modernes et performantes."
            : "Melvin Akou's (Melvyn) portfolio — Junior full-stack JS/PHP web developer based in Abidjan, Côte d'Ivoire. React, Next.js, Node.js, Laravel, Firebase projects. Building modern, high-performance web applications.",
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
            title: locale === "fr"
                ? "Melvin Akou — Développeur Web Full-Stack | React, Next.js, Laravel"
                : "Melvin Akou — Full-Stack Web Developer | React, Next.js, Laravel",
            description: locale === "fr"
                ? "Découvrez les projets et compétences de Melvin Akou, développeur web JS/PHP full-stack junior spécialisé en React, Next.js, Laravel et Firebase."
                : "Explore the projects and skills of Melvin Akou, a junior full-stack JS/PHP web developer specializing in React, Next.js, Laravel, and Firebase.",
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
