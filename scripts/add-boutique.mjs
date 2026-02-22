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

await db.ref("projects").push({
    title: "Boutique en Ligne",
    description:
        "Clone e-commerce Autorapid avec landing page, boutique, panier, auth client email/Google, vérification email, espace compte avec wishlist, et backoffice admin complet (CRUD produits, upload images compressées via ImageKit). Architecture API Routes Next.js et Firebase Realtime Database.",
    image: "",
    tags: JSON.stringify(["Next.js 16", "React 19", "TypeScript", "Firebase", "Tailwind CSS 4", "DaisyUI", "ImageKit", "Zustand"]),
    category: "Fullstack",
    github: "https://github.com/melvin-phyllis/boutiqueenligne",
    link: "",
    featured: true,
    createdAt: now,
    updatedAt: now,
});

console.log("✅ Boutique en Ligne project added to Firebase");
process.exit(0);
