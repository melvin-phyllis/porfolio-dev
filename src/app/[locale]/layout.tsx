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
        ? "Akou N'dy Phyllis Melvin - Portfolio"
        : "Akou N'dy Phyllis Melvin - Portfolio";

    const siteDescription = locale === "fr"
        ? "Portfolio de Akou N'dy Phyllis Melvin - Développeur Web JS/PHP Full-Stack Junior"
        : "Akou N'dy Phyllis Melvin's Portfolio - Junior Full-Stack Web Developer";

    return (
        <>
            <WebsiteSchema
                name={siteName}
                url={`${baseUrl}/${locale}`}
                description={siteDescription}
            />
            <PersonSchema
                name="Akou N'dy Phyllis Melvin"
                jobTitle="Développeur Web JS/PHP Full-Stack Junior"
                description={profile?.about || "Développeur Web JS/PHP Full-Stack Junior spécialisé en React, Next.js, Node.js, PHP, Laravel et Firebase."}
                image={profile?.image || `${baseUrl}/images/profile.svg`}
                url={`${baseUrl}/${locale}`}
                sameAs={[
                    profile?.github || "https://github.com/melvin-phyllis",
                    profile?.linkedin || "https://www.linkedin.com/in/melvin-akou/",
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
