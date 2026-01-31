import { db } from "@/lib/firebase";

// Types
export interface Profile {
    id?: string;
    headline: string;
    subheadline: string;
    about: string;
    email: string;
    github: string;
    linkedin: string;
    twitter: string;
    resumeUrl: string;
    image?: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    tags: string; // JSON string to match Prisma/Columns expectation
    category: string;
    github: string;
    link: string;
    featured: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Skill {
    id: string;
    name: string;
    level: number;
    category: string;
    icon: string;
    color?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface Experience {
    id: string;
    role: string;
    company: string;
    date: string;
    description: string;
    current: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// --- Reads ---

// --- Reads ---

export async function getProfile() {
    const snapshot = await db.ref("profile").once("value");
    return snapshot.val() as Profile;
}

export async function getProjects() {
    const snapshot = await db.ref("projects").once("value");
    const data = snapshot.val();
    if (!data) return [];

    return Object.entries(data).map(([id, val]: [string, any]) => {
        // Determine tags format: if array in DB, keep it. If JSON string, keep it?
        // Columns expects JSON string. EditPage expects JSON string or array (we handled it).
        // Let's normalize to JSON string for `tags` to satisfy Columns type if possible?
        // Use 'any' cast inside map to bypass strict type check for now or adjust logic.

        let tags = val.tags;
        if (Array.isArray(tags)) {
            tags = JSON.stringify(tags);
        } else if (!tags) {
            tags = "[]";
        }

        return {
            id,
            ...val,
            tags: tags, // Return as string
            createdAt: val.createdAt ? new Date(val.createdAt) : new Date(), // Mock date if missing
            updatedAt: val.updatedAt ? new Date(val.updatedAt) : new Date(),
        };
    }) as unknown as Project[];
}

export async function getProject(id: string) {
    const snapshot = await db.ref(`projects/${id}`).once("value");
    const val = snapshot.val();
    if (!val) return null;

    let tags = val.tags;
    // Helper should probably return Array for EditPage convenience?
    // But getProjects returns String for Columns convenience.
    // Let's make Project interface adhere to ONE truth. 
    // Prisma Project had tags: String.
    // So let's align: Project.tags is string.

    return {
        id,
        ...val,
        tags: Array.isArray(tags) ? JSON.stringify(tags) : (tags || "[]"),
        createdAt: val.createdAt ? new Date(val.createdAt) : new Date(),
        updatedAt: val.updatedAt ? new Date(val.updatedAt) : new Date(),
    } as unknown as Project;
}

export async function getSkills() {
    const snapshot = await db.ref("skills").once("value");
    const data = snapshot.val();
    if (!data) return [];
    return Object.entries(data).map(([id, val]: [string, any]) => ({
        id,
        ...val,
        createdAt: val.createdAt ? new Date(val.createdAt) : new Date(),
        updatedAt: val.updatedAt ? new Date(val.updatedAt) : new Date(),
    })) as Skill[];
}

export async function getSkill(id: string) {
    const snapshot = await db.ref(`skills/${id}`).once("value");
    const val = snapshot.val();
    if (!val) return null;
    return {
        id,
        ...val,
        createdAt: val.createdAt ? new Date(val.createdAt) : new Date(),
        updatedAt: val.updatedAt ? new Date(val.updatedAt) : new Date(),
    } as Skill;
}

export async function getExperiences() {
    const snapshot = await db.ref("experiences").once("value");
    const data = snapshot.val();
    if (!data) return [];
    return Object.entries(data).map(([id, val]: [string, any]) => ({
        id,
        ...val,
        createdAt: val.createdAt ? new Date(val.createdAt) : new Date(),
        updatedAt: val.updatedAt ? new Date(val.updatedAt) : new Date(),
    })) as Experience[];
}

export async function getExperience(id: string) {
    const snapshot = await db.ref(`experiences/${id}`).once("value");
    const val = snapshot.val();
    if (!val) return null;
    return {
        id,
        ...val,
        createdAt: val.createdAt ? new Date(val.createdAt) : new Date(),
        updatedAt: val.updatedAt ? new Date(val.updatedAt) : new Date(),
    } as Experience;
}


// --- Writes (for Server Actions) ---

function sanitizeForDB(data: any) {
    const sanitized = { ...data };
    if (sanitized.createdAt instanceof Date) sanitized.createdAt = sanitized.createdAt.toISOString();
    if (sanitized.updatedAt instanceof Date) sanitized.updatedAt = sanitized.updatedAt.toISOString();
    return sanitized;
}

export async function updateProfileDB(data: Partial<Profile>) {
    await db.ref("profile").update(data);
}

export async function createProjectDB(data: Omit<Project, 'id'>) {
    const payload = sanitizeForDB({
        ...data,
        tags: data.tags // already string
    });
    return db.ref("projects").push(payload);
}

export async function updateProjectDB(id: string, data: Partial<Project>) {
    const payload = sanitizeForDB(data);
    await db.ref(`projects/${id}`).update(payload);
}

export async function deleteProjectDB(id: string) {
    await db.ref(`projects/${id}`).remove();
}

export async function createSkillDB(data: Omit<Skill, 'id'>) {
    return db.ref("skills").push(sanitizeForDB(data));
}

export async function updateSkillDB(id: string, data: Partial<Skill>) {
    await db.ref(`skills/${id}`).update(sanitizeForDB(data));
}

export async function deleteSkillDB(id: string) {
    await db.ref(`skills/${id}`).remove();
}

export async function createExperienceDB(data: Omit<Experience, 'id'>) {
    return db.ref("experiences").push(sanitizeForDB(data));
}

export async function updateExperienceDB(id: string, data: Partial<Experience>) {
    await db.ref(`experiences/${id}`).update(sanitizeForDB(data));
}

export async function deleteExperienceDB(id: string) {
    await db.ref(`experiences/${id}`).remove();
}
