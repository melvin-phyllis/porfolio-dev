import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr", // Français par défaut
  localeDetection: true, // Détection automatique basée sur Accept-Language du navigateur
  localePrefix: "always", // Toujours afficher le préfixe de locale dans l'URL
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

