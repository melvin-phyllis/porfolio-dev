"use client";

import Script from "next/script";

interface PersonSchemaProps {
    name: string;
    jobTitle: string;
    description: string;
    image: string;
    url: string;
    sameAs: string[];
    worksFor?: {
        name: string;
        url?: string;
    };
    alternateName?: string[];
    knowsAbout?: string[];
}

export function PersonSchema({
    name,
    jobTitle,
    description,
    image,
    url,
    sameAs,
    worksFor,
    alternateName,
    knowsAbout,
}: PersonSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Person",
        name,
        ...(alternateName && { alternateName }),
        jobTitle,
        description,
        image,
        url,
        sameAs,
        ...(knowsAbout && { knowsAbout }),
        nationality: {
            "@type": "Country",
            name: "Côte d'Ivoire",
        },
        address: {
            "@type": "PostalAddress",
            addressLocality: "Abidjan",
            addressCountry: "CI",
        },
        knowsLanguage: ["fr", "en"],
        ...(worksFor && {
            worksFor: {
                "@type": "Organization",
                name: worksFor.name,
                url: worksFor.url,
            },
        }),
    };

    return (
        <Script
            id="person-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

interface ArticleSchemaProps {
    headline: string;
    description: string;
    image: string;
    datePublished: string;
    dateModified?: string;
    authorName: string;
    url: string;
    keywords?: string[];
}

export function ArticleSchema({
    headline,
    description,
    image,
    datePublished,
    dateModified,
    authorName,
    url,
    keywords,
}: ArticleSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline,
        description,
        image,
        datePublished,
        dateModified: dateModified || datePublished,
        author: {
            "@type": "Person",
            name: authorName,
        },
        publisher: {
            "@type": "Person",
            name: authorName,
        },
        url,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url,
        },
        ...(keywords && { keywords: keywords.join(", ") }),
    };

    return (
        <Script
            id="article-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

interface WebsiteSchemaProps {
    name: string;
    url: string;
    description: string;
}

export function WebsiteSchema({ name, url, description }: WebsiteSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name,
        url,
        description,
        potentialAction: {
            "@type": "SearchAction",
            target: {
                "@type": "EntryPoint",
                urlTemplate: `${url}/blog?search={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
        },
    };

    return (
        <Script
            id="website-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

interface BreadcrumbSchemaProps {
    items: {
        name: string;
        url: string;
    }[];
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };

    return (
        <Script
            id="breadcrumb-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
