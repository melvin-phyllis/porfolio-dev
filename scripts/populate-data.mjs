// Script to populate Firebase with real CV data
// Run: node scripts/populate-data.mjs

import admin from "firebase-admin";
import { createRequire } from "module";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import dotenv from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "../.env") });

// Init Firebase Admin
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

// ============================================================
// PROFILE
// ============================================================
const profile = {
    headline: "Akou N'dy Phyllis Melvin",
    subheadline: "Développeur Web Full-Stack Junior",
    about:
        "Développeur full-stack junior passionné, j'aime apprendre et transformer des idées en projets concrets. Maîtrise de React, Next.js, Node.js et Firebase. À la recherche d'une première expérience professionnelle pour continuer à progresser et créer des applications web modernes et performantes.",
    email: "melvinphyllisakou@gmail.com",
    phone: "+225 01-71-37-90-09",
    location: "Abidjan, Côte d'Ivoire",
    github: "https://github.com/melvinphyllis",
    linkedin: "https://linkedin.com/in/melvinphyllis",
    twitter: "",
    resumeUrl: "/cv-melvin-phyllis.pdf",
    image: "/images/profile.jpg",
};

// ============================================================
// SKILLS
// ============================================================
const skills = [
    // Frontend
    { name: "React.js", level: 85, category: "Frontend", icon: "⚛️", color: "#61DAFB" },
    { name: "Next.js", level: 80, category: "Frontend", icon: "▲", color: "#ffffff" },
    { name: "Tailwind CSS", level: 85, category: "Frontend", icon: "🎨", color: "#38BDF8" },
    { name: "TypeScript", level: 70, category: "Frontend", icon: "🔷", color: "#3178C6" },
    { name: "JavaScript ES6+", level: 85, category: "Frontend", icon: "🟨", color: "#F7DF1E" },
    { name: "Ionic React", level: 60, category: "Frontend", icon: "⚡", color: "#3880FF" },
    { name: "React Router", level: 75, category: "Frontend", icon: "🔀", color: "#CA4245" },
    { name: "Zustand", level: 70, category: "Frontend", icon: "🐻", color: "#F59E0B" },
    // Backend
    { name: "Node.js", level: 70, category: "Backend", icon: "🟢", color: "#339933" },
    { name: "Express.js", level: 65, category: "Backend", icon: "🚂", color: "#ffffff" },
    { name: "API REST", level: 80, category: "Backend", icon: "🔗", color: "#FF6B35" },
    { name: "Authentification JWT", level: 70, category: "Backend", icon: "🔐", color: "#F59E0B" },
    // Base de données
    { name: "Firebase", level: 80, category: "Base de données", icon: "🔥", color: "#FFCA28" },
    { name: "MongoDB", level: 60, category: "Base de données", icon: "🍃", color: "#47A248" },
    { name: "MySQL", level: 55, category: "Base de données", icon: "🐬", color: "#4479A1" },
    // Outils
    { name: "Git & GitHub", level: 80, category: "Outils", icon: "🐙", color: "#F05032" },
    { name: "Postman", level: 75, category: "Outils", icon: "📬", color: "#FF6C37" },
    { name: "Architecture MVC", level: 70, category: "Outils", icon: "🏗️", color: "#6366F1" },
];

// ============================================================
// PROJECTS
// ============================================================
const projects = [
    {
        title: "Ustream Movies",
        description:
            "Mini-plateforme de streaming avec authentification email/Google, profil utilisateur complet, CRUD de films en temps réel via SWR et Firebase. Interface moderne et responsive avec animations et modales interactives.",
        image: "",
        tags: JSON.stringify(["React 19", "Firebase", "Zustand", "SWR", "Tailwind CSS 4", "DaisyUI"]),
        category: "Fullstack",
        github: "https://github.com/melvinphyllis/ustream-movies",
        link: "",
        featured: true,
        createdAt: now,
        updatedAt: now,
    },
    {
        title: "CineVault",
        description:
            "Application web de découverte et recherche de films en temps réel via l'API TMDB. Design moderne inspiré de Netflix, modal détaillé avec synopsis, note, genres et durée. Manipulation avancée du DOM et fetch API.",
        image: "",
        tags: JSON.stringify(["HTML5", "CSS3", "JavaScript ES6+", "API TMDB"]),
        category: "Frontend",
        github: "https://github.com/melvinphyllis/cinevault",
        link: "",
        featured: true,
        createdAt: now,
        updatedAt: now,
    },
    {
        title: "Realtime Taskflow",
        description:
            "Application de gestion de tâches en temps réel avec inscription/connexion Firebase Auth, CRUD de tâches en temps réel, état global Zustand, notifications via React Toastify. Routes API Next.js et Server Actions.",
        image: "",
        tags: JSON.stringify(["Next.js 16", "React 19", "TypeScript", "Firebase", "Zustand", "Tailwind CSS 4"]),
        category: "Fullstack",
        github: "https://github.com/melvinphyllis/realtime-taskflow",
        link: "",
        featured: false,
        createdAt: now,
        updatedAt: now,
    },
];

// ============================================================
// EXPERIENCES (Formations + Certifications)
// ============================================================
const experiences = [
    {
        role: "Formation Développement Logiciel & IA",
        company: "GomyCode",
        date: "Août 2025 – Décembre 2025 (en cours)",
        description:
            "Formation intensive en développement logiciel avec compétences en Intelligence Artificielle. Développement fullstack, bonnes pratiques et projets concrets.",
        current: true,
        createdAt: now,
        updatedAt: now,
    },
    {
        role: "Licence 3 — Développeur d'Application & E-service",
        company: "Université Virtuelle de Côte d'Ivoire (UVCI)",
        date: "2023 – Juin 2026 (en cours)",
        description:
            "Formation en développement d'applications web et e-services. Conception, développement et déploiement d'applications modernes.",
        current: true,
        createdAt: now,
        updatedAt: now,
    },
    {
        role: "Certifications — React, Front-End, HTML/CSS, Git",
        company: "Meta & IBM via Coursera · freeCodeCamp",
        date: "2025",
        description:
            "React Basics (Meta), Introduction to Front-End Development (Meta), Introduction to HTML/CSS & JavaScript (IBM), Getting Started with Git & GitHub (IBM), Legacy Responsive Web Design — 300h (freeCodeCamp).",
        current: false,
        createdAt: now,
        updatedAt: now,
    },
];

// ============================================================
// RUN
// ============================================================
async function populate() {
    console.log("🔥 Connecting to Firebase...");

    // Clear existing data
    console.log("🗑️  Clearing existing data...");
    await db.ref("profile").set(profile);
    await db.ref("projects").remove();
    await db.ref("skills").remove();
    await db.ref("experiences").remove();

    console.log("✅ Profile updated");

    // Add skills
    for (const skill of skills) {
        await db.ref("skills").push({ ...skill, createdAt: now, updatedAt: now });
    }
    console.log(`✅ ${skills.length} skills added`);

    // Add projects
    for (const project of projects) {
        await db.ref("projects").push(project);
    }
    console.log(`✅ ${projects.length} projects added`);

    // Add experiences
    for (const exp of experiences) {
        await db.ref("experiences").push(exp);
    }
    console.log(`✅ ${experiences.length} experiences added`);

    console.log("\n🎉 Firebase populated successfully!");
    process.exit(0);
}

populate().catch((err) => {
    console.error("❌ Error:", err);
    process.exit(1);
});
