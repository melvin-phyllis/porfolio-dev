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

const demoLinks = {
    "Ustream Movies": "https://u-stream.netlify.app/",
    "CineVault": "https://melvin-phyllis.github.io/CineVault/",
    "Realtime Taskflow": "https://realtime-taskflow.vercel.app/",
    "ManageX": "https://ya-consulting.com/managex/public/",
    "Boutique en Ligne": "https://boutique-en-ligne-chi.vercel.app/",
};

// Lire tous les projets et mettre à jour les liens
const snapshot = await db.ref("projects").once("value");
const data = snapshot.val();

if (!data) {
    console.log("❌ Aucun projet trouvé dans Firebase");
    process.exit(1);
}

let updated = 0;
for (const [id, project] of Object.entries(data)) {
    const p = project;
    if (demoLinks[p.title]) {
        await db.ref(`projects/${id}`).update({ link: demoLinks[p.title] });
        console.log(`✅ ${p.title} → ${demoLinks[p.title]}`);
        updated++;
    }
}

console.log(`\n🎉 ${updated} projet(s) mis à jour !`);
process.exit(0);
