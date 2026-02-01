import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const { auth } = NextAuth(authConfig);

// Langues supportées
const locales = ["fr", "en"];
const defaultLocale = "fr";

// Fonction pour détecter la langue préférée
function getPreferredLocale(request: NextRequest): string {
    // Vérifier le cookie de langue (si l'utilisateur a déjà choisi)
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
    if (cookieLocale && locales.includes(cookieLocale)) {
        return cookieLocale;
    }

    // Détecter depuis l'en-tête Accept-Language
    const acceptLanguage = request.headers.get("Accept-Language");
    if (acceptLanguage) {
        // Parser l'en-tête Accept-Language (ex: "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7")
        const languages = acceptLanguage
            .split(",")
            .map((lang) => {
                const [code, q = "q=1"] = lang.trim().split(";");
                const quality = parseFloat(q.replace("q=", "")) || 1;
                // Extraire le code de langue principal (fr-FR -> fr)
                const mainCode = code.split("-")[0].toLowerCase();
                return { code: mainCode, quality };
            })
            .sort((a, b) => b.quality - a.quality);

        // Trouver la première langue supportée
        for (const { code } of languages) {
            if (locales.includes(code)) {
                return code;
            }
        }
    }

    return defaultLocale;
}

// Paths qui ne nécessitent pas de redirection de langue
const publicPaths = [
    "/api",
    "/_next",
    "/favicon.ico",
    "/images",
    "/robots.txt",
    "/sitemap.xml",
    "/manifest.json",
];

// Paths de l'admin (pas de redirection de langue)
const adminPaths = ["/admin"];

export default auth((request) => {
    const { pathname } = request.nextUrl;

    // Ignorer les fichiers statiques et API
    if (publicPaths.some((path) => pathname.startsWith(path))) {
        return NextResponse.next();
    }

    // Ignorer les paths admin (gérés par NextAuth)
    if (adminPaths.some((path) => pathname.startsWith(path))) {
        return NextResponse.next();
    }

    // Vérifier si le path commence déjà par une locale
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    // Si déjà sur une page localisée, continuer
    if (pathnameHasLocale) {
        return NextResponse.next();
    }

    // Rediriger vers la langue préférée
    const locale = getPreferredLocale(request);
    const newUrl = new URL(`/${locale}${pathname}`, request.url);

    // Créer la réponse de redirection
    const response = NextResponse.redirect(newUrl);

    // Sauvegarder la préférence de langue dans un cookie
    response.cookies.set("NEXT_LOCALE", locale, {
        maxAge: 60 * 60 * 24 * 365, // 1 an
        path: "/",
    });

    return response;
});

export const config = {
    // Matcher pour toutes les pages sauf les fichiers statiques
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
