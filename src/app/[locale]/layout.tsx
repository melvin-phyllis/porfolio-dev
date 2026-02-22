import AnimatedCursor from "@/components/AnimatedCursor";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ParticlesBackground from "@/components/ParticlesBackground";
import PageViewTracker from "@/components/PageViewTracker";
import { PersonSchema, WebsiteSchema } from "@/components/JsonLd";
import { routing } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { getProfile } from "@/lib/firebase-db";
import type { Metadata } from "next";

type Locale = (typeof routing.locales)[number];

// Force manifest to root path so /fr/manifest.webmanifest doesn't 404
export const metadata: Metadata = {
    manifest: "/manifest.webmanifest",
};


export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!routing.locales.includes(locale as Locale)) {
        notFound();
    }

    const messages = await getMessages();
    const profile = await getProfile();
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://zaerthnh.dev";

    const siteName = locale === "fr"
        ? "Melvin Akou — Développeur Web Full-Stack"
        : "Melvin Akou — Full-Stack Web Developer";

    const siteDescription = locale === "fr"
        ? "Portfolio de Melvin Akou (Melvyn) — Développeur Web JS/PHP Full-Stack Junior, Abidjan, Côte d'Ivoire"
        : "Melvin Akou's (Melvyn) Portfolio — Junior Full-Stack JS/PHP Web Developer, Abidjan, Côte d'Ivoire";

    return (
        <>
            <WebsiteSchema
                name={siteName}
                url={`${baseUrl}/${locale}`}
                description={siteDescription}
            />
            <PersonSchema
                name="Melvin Akou"
                alternateName={[
                    "Akou N'dy Phyllis Melvin",
                    "Melvyn Akou",
                    "Akou Melvin",
                    "Akou Melvyn",
                    "Melvin Phyllis",
                    "melvin-phyllis",
                    "Melvin Dev",
                ]}
                jobTitle="Développeur Web JS/PHP Full-Stack Junior"
                description={profile?.about || "Développeur Web JS/PHP Full-Stack Junior spécialisé en React, Next.js, Node.js, PHP, Laravel et Firebase. Basé à Abidjan, Côte d'Ivoire."}
                image={profile?.image || `${baseUrl}/images/profile.svg`}
                url={`${baseUrl}/${locale}`}
                sameAs={[
                    profile?.github || "https://github.com/melvin-phyllis",
                    profile?.linkedin || "https://www.linkedin.com/in/melvin-akou/",
                ]}
                knowsAbout={[
                    "JavaScript", "TypeScript", "PHP",
                    "React", "Next.js", "Node.js", "Laravel",
                    "Firebase", "MongoDB", "MySQL",
                    "Tailwind CSS", "Docker", "Git",
                    "REST API", "Zustand", "Prisma",
                    "Développement web full-stack",
                    "Applications web modernes",
                    "E-commerce",
                ]}
                worksFor={{
                    name: "Ya Consulting",
                }}
            />
            <NextIntlClientProvider locale={locale} messages={messages}>
                <PageViewTracker />
                <AnimatedCursor
                    innerSize={8}
                    outerSize={35}
                    color="255, 255, 255"
                    outerAlpha={0.4}
                    innerScale={0.6}
                    outerScale={1.8}
                    trailingSpeed={8}
                />
                <ParticlesBackground />
                <Navbar />
                <main>{children}</main>
                <Footer />
            </NextIntlClientProvider>
        </>
    );
}
