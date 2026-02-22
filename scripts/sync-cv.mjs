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

// ============================================================
// PROFILE — updated title & domain
// ============================================================
await db.ref("profile").update({
    headline: "Akou N'dy Phyllis Melvin",
    subheadline: "Développeur Web JS/PHP Full-Stack Junior",
    about:
        "Développeur full-stack junior, j'aime apprendre et transformer des idées en projets concrets. Je suis à la recherche d'une première expérience pour continuer à progresser.",
    email: "melvinphyllisakou@gmail.com",
    phone: "+225 01-71-37-90-09",
    location: "Abidjan, Côte d'Ivoire",
    github: "https://github.com/melvin-phyllis",
    linkedin: "https://www.linkedin.com/in/melvin-akou/",
    twitter: "",
    resumeUrl: "/cv-melvin-phyllis.pdf",
    image: "/images/profile.jpg",
});
console.log("✅ Profile updated");

// ============================================================
// SKILLS — full reset with updated CV categories
// ============================================================
await db.ref("skills").remove();

const skills = [
    // Frontend
    { name: "React.js", level: 85, category: "Frontend", icon: "⚛️", color: "#61DAFB" },
    { name: "Next.js", level: 80, category: "Frontend", icon: "▲", color: "#ffffff" },
    { name: "Tailwind CSS", level: 85, category: "Frontend", icon: "🎨", color: "#38BDF8" },
    { name: "Ionic React", level: 60, category: "Frontend", icon: "⚡", color: "#3880FF" },
    { name: "PHP", level: 70, category: "Frontend", icon: "🐘", color: "#777BB4" },
    // Backend
    { name: "Node.js", level: 70, category: "Backend", icon: "🟢", color: "#339933" },
    { name: "Express.js", level: 65, category: "Backend", icon: "🚂", color: "#ffffff" },
    { name: "Laravel", level: 65, category: "Backend", icon: "🔴", color: "#FF2D20" },
    { name: "API REST", level: 80, category: "Backend", icon: "🔗", color: "#FF6B35" },
    { name: "Authentification JWT", level: 70, category: "Backend", icon: "🔐", color: "#F59E0B" },
    { name: "JavaScript ES6+", level: 85, category: "Backend", icon: "🟨", color: "#F7DF1E" },
    { name: "TypeScript", level: 70, category: "Backend", icon: "🔷", color: "#3178C6" },
    // Base de données
    { name: "Firebase", level: 80, category: "Base de données", icon: "🔥", color: "#FFCA28" },
    { name: "MongoDB", level: 60, category: "Base de données", icon: "🍃", color: "#47A248" },
    { name: "MySQL", level: 60, category: "Base de données", icon: "🐬", color: "#4479A1" },
    // DevOps
    { name: "Docker", level: 55, category: "DevOps", icon: "🐳", color: "#2496ED" },
    { name: "Git & GitHub", level: 80, category: "DevOps", icon: "🐙", color: "#F05032" },
    // Automatisation
    { name: "N8N", level: 55, category: "Automatisation", icon: "🔄", color: "#EA4B71" },
    { name: "Make", level: 55, category: "Automatisation", icon: "⚙️", color: "#6D28D9" },
    // Data
    { name: "Power BI", level: 50, category: "Data", icon: "📊", color: "#F2C811" },
    { name: "Airflow", level: 45, category: "Data", icon: "🌬️", color: "#017CEE" },
    // Outils
    { name: "Postman", level: 75, category: "Outils", icon: "📬", color: "#FF6C37" },
];

for (const skill of skills) {
    await db.ref("skills").push({ ...skill, createdAt: now, updatedAt: now });
}
console.log(`✅ ${skills.length} skills updated`);

// ============================================================
// EXPERIENCES — corrected dates
// ============================================================
await db.ref("experiences").remove();

const experiences = [
    {
        role: "Stage — Développeur Web",
        company: "Ya Consulting",
        date: "Janvier 2026 – en cours",
        description:
            "Développement d'applications web avec PHP et Laravel. Intégration d'APIs REST, gestion de bases de données MySQL, travail en équipe avec méthodologies agiles.",
        current: true,
        createdAt: now,
        updatedAt: now,
    },
    {
        role: "Formation Développement Logiciel & IA",
        company: "GomyCode",
        date: "Août 2025 – Décembre 2025",
        description:
            "Formation intensive en développement logiciel avec compétences en Intelligence Artificielle. Développement fullstack, bonnes pratiques et projets concrets.",
        current: false,
        createdAt: now,
        updatedAt: now,
    },
    {
        role: "Licence 3 — Développeur d'Application & E-service",
        company: "Université Virtuelle de Côte d'Ivoire (UVCI)",
        date: "2023 – en cours",
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

for (const exp of experiences) {
    await db.ref("experiences").push(exp);
}
console.log(`✅ ${experiences.length} experiences updated`);

console.log("\n🎉 Firebase fully synced with updated CV!");
process.exit(0);
