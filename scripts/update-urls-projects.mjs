import admin from "firebase-admin";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "../.env") });

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
        databaseURL: process.env.FIREBASE_DATABASE_URL,
    });
}

const db = admin.database();
const now = new Date().toISOString();

// 1. Fix profile URLs
await db.ref("profile").update({
    github: "https://github.com/melvin-phyllis",
    linkedin: "https://www.linkedin.com/in/melvin-akou/",
});
console.log("✅ Profile URLs updated");

// 2. Clear projects and re-add with correct data
await db.ref("projects").remove();

const projects = [
    {
        title: "Ustream Movies",
        description: "Mini-plateforme de streaming avec authentification email/Google, gestion complète du profil utilisateur, CRUD complet avec statut public/privé. Catalogue de films mis à jour en temps réel via SWR et Firebase. Interface moderne et responsive avec animations et modales.",
        image: "",
        tags: JSON.stringify(["React 19", "Firebase", "Zustand", "SWR", "Tailwind CSS 4", "DaisyUI"]),
        category: "Fullstack",
        github: "https://github.com/melvin-phyllis/ustream-movies",
        link: "",
        featured: true,
        createdAt: now,
        updatedAt: now,
    },
    {
        title: "CineVault",
        description: "Application web de découverte de films en temps réel via l'API TMDB. Design moderne inspiré de Netflix avec animations et UI responsive. Modal détaillé : synopsis, note, genres.",
        image: "",
        tags: JSON.stringify(["HTML5", "CSS3", "JavaScript ES6+", "API TMDB"]),
        category: "Frontend",
        github: "https://github.com/melvin-phyllis/cinevault",
        link: "",
        featured: true,
        createdAt: now,
        updatedAt: now,
    },
    {
        title: "Realtime Taskflow",
        description: "Application de gestion de tâches en temps réel. Inscription/connexion via Firebase Auth, CRUD en temps réel, état global Zustand, Routes API Next.js + Server Actions.",
        image: "",
        tags: JSON.stringify(["Next.js 16", "React 19", "TypeScript", "Firebase", "Zustand", "Tailwind CSS 4"]),
        category: "Fullstack",
        github: "https://github.com/melvin-phyllis/realtime-taskflow",
        link: "",
        featured: true,
        createdAt: now,
        updatedAt: now,
    },
    {
        title: "ManageX",
        description: "Système de Gestion RH avancé. Authentification sécurisée avec Laravel et rôles avancés. Gestion de tâches en direct grâce à Reverb/Pusher. Interface moderne et souple conçue avec Tailwind et composants Blade.",
        image: "",
        tags: JSON.stringify(["PHP", "Laravel", "Tailwind CSS", "Blade", "Reverb", "Pusher"]),
        category: "Fullstack",
        github: "https://github.com/melvin-phyllis/managex",
        link: "",
        featured: true,
        createdAt: now,
        updatedAt: now,
    },
];

for (const project of projects) {
    await db.ref("projects").push(project);
}
console.log(`✅ ${projects.length} projects updated (ManageX added)`);

process.exit(0);
