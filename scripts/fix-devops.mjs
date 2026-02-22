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
const snap = await db.ref("skills").once("value");
const skills = snap.val();

for (const [key, skill] of Object.entries(skills)) {
    if (skill.category === "DevOps") {
        await db.ref(`skills/${key}/category`).set("Outils");
        console.log(`✅ ${skill.name}: DevOps → Outils`);
    }
}

console.log("Done");
process.exit(0);
