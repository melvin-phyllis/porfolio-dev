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

type Locale = (typeof routing.locales)[number];

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
        ? "Marie Danielle Akpeuby - Portfolio"
        : "Marie Danielle Akpeuby - Portfolio";
    
    const siteDescription = locale === "fr"
        ? "Portfolio de Marie Danielle Akpeuby - Développeuse Fullstack & DevOps"
        : "Marie Danielle Akpeuby's Portfolio - Fullstack Developer & DevOps";

    return (
        <>
            <WebsiteSchema
                name={siteName}
                url={`${baseUrl}/${locale}`}
                description={siteDescription}
            />
            <PersonSchema
                name="Marie Danielle Akpeuby"
                jobTitle="Développeuse Fullstack & DevOps"
                description={profile?.about || "Développeuse Fullstack & DevOps spécialisée en React, Next.js, Node.js, Docker et Kubernetes."}
                image={profile?.image || `${baseUrl}/images/profile.svg`}
                url={`${baseUrl}/${locale}`}
                sameAs={[
                    profile?.github || "https://github.com/zaerthnh",
                    profile?.linkedin || "https://linkedin.com/in/zaerthnh",
                    profile?.twitter || "https://twitter.com/zaerthnh",
                ]}
                worksFor={{
                    name: "Freelance",
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
