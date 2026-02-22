import { Metadata } from "next";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;

    return {
        title: locale === "fr" ? "Blog" : "Blog",
        description:
            locale === "fr"
                ? "Découvrez mes articles sur le développement web, React, Next.js, Node.js et Laravel."
                : "Discover my articles about web development, React, Next.js, Node.js and Laravel.",
    };
}

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
