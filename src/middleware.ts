import { routing } from "@/i18n/routing";
import { authConfig } from "@/lib/auth.config";
import NextAuth from "next-auth";
import createMiddleware from "next-intl/middleware";

const { auth } = NextAuth(authConfig);

const intlMiddleware = createMiddleware(routing);

// @ts-ignore
export default auth((req) => {
    // auth() wrapper ensures authentication logic (in auth.config.ts) runs first.
    // If the user hits the root path, redirect based on the browser language.
    if (req.nextUrl.pathname === "/" || req.nextUrl.pathname === "") {
        const acceptLanguage = req.headers.get("accept-language") || "";
        const primary = acceptLanguage.split(",")[0] || "";
        const lang = primary.split("-")[0].toLowerCase();
        const locale = lang.startsWith("fr") ? "fr" : "en";
        const target = new URL(`/${locale}${req.nextUrl.search || ""}`, req.url);
        return Response.redirect(target);
    }

    // Otherwise let next-intl handle locale routing.
    return intlMiddleware(req);
});

export const config = {
    // Skip all paths that should not be internationalized
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|images|manifest.webmanifest|\\.well-known|.*\\.png$|.*\\.ico$|.*\\.svg$|.*\\.webmanifest$|.*\\.pdf$).*)"
    ],
};
