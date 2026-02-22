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

// Add current internship
await db.ref("experiences").push({
    role: "Développeur Web — Stage",
    company: "Ya Consulting",
    date: "2026 (en cours)",
    description:
        "Stage en développement web PHP/Laravel. Conception et développement d'applications web, intégration d'APIs, gestion de bases de données MySQL, travail en équipe avec méthodologies agiles.",
    current: true,
    createdAt: now,
    updatedAt: now,
});
console.log("✅ Stage Ya Consulting ajouté");

// Add PHP & Laravel skills
await db.ref("skills").push({ name: "PHP", level: 65, category: "Backend", icon: "🐘", color: "#777BB4", createdAt: now, updatedAt: now });
await db.ref("skills").push({ name: "Laravel", level: 60, category: "Backend", icon: "🔴", color: "#FF2D20", createdAt: now, updatedAt: now });
console.log("✅ Skills PHP & Laravel ajoutées");

process.exit(0);
