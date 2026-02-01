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
    icon: string | null;
    color: string | null;
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

export interface Article {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image: string;
    category: string;
    tags: string;
    author: string;
    published: boolean;
    featured: boolean;
    views: number;
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
        icon: val.icon || null,
        color: val.color || null,
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

// --- Articles ---

export async function getArticles() {
    const snapshot = await db.ref("articles").once("value");
    const data = snapshot.val();
    if (!data) return [];

    return Object.entries(data).map(([id, val]: [string, any]) => {
        let tags = val.tags;
        if (Array.isArray(tags)) {
            tags = JSON.stringify(tags);
        } else if (!tags) {
            tags = "[]";
        }

        return {
            id,
            ...val,
            tags,
            views: val.views || 0,
            createdAt: val.createdAt ? new Date(val.createdAt) : new Date(),
            updatedAt: val.updatedAt ? new Date(val.updatedAt) : new Date(),
        };
    }) as Article[];
}

export async function getArticle(id: string) {
    const snapshot = await db.ref(`articles/${id}`).once("value");
    const val = snapshot.val();
    if (!val) return null;

    let tags = val.tags;
    if (Array.isArray(tags)) {
        tags = JSON.stringify(tags);
    } else if (!tags) {
        tags = "[]";
    }

    return {
        id,
        ...val,
        tags,
        views: val.views || 0,
        createdAt: val.createdAt ? new Date(val.createdAt) : new Date(),
        updatedAt: val.updatedAt ? new Date(val.updatedAt) : new Date(),
    } as Article;
}

export async function getArticleBySlug(slug: string) {
    const snapshot = await db.ref("articles").orderByChild("slug").equalTo(slug).once("value");
    const data = snapshot.val();
    if (!data) return null;

    const entries = Object.entries(data);
    if (entries.length === 0) return null;

    const [id, val] = entries[0] as [string, any];
    let tags = val.tags;
    if (Array.isArray(tags)) {
        tags = JSON.stringify(tags);
    } else if (!tags) {
        tags = "[]";
    }

    return {
        id,
        ...val,
        tags,
        views: val.views || 0,
        createdAt: val.createdAt ? new Date(val.createdAt) : new Date(),
        updatedAt: val.updatedAt ? new Date(val.updatedAt) : new Date(),
    } as Article;
}

export async function getPublishedArticles() {
    const articles = await getArticles();
    return articles
        .filter(a => a.published)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getFeaturedArticles() {
    const articles = await getArticles();
    return articles
        .filter(a => a.published && a.featured)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function createArticleDB(data: Omit<Article, 'id'>) {
    const payload = sanitizeForDB({
        ...data,
        views: 0,
    });
    return db.ref("articles").push(payload);
}

export async function updateArticleDB(id: string, data: Partial<Article>) {
    await db.ref(`articles/${id}`).update(sanitizeForDB(data));
}

export async function deleteArticleDB(id: string) {
    await db.ref(`articles/${id}`).remove();
}

export async function incrementArticleViews(id: string) {
    const article = await getArticle(id);
    if (article) {
        await db.ref(`articles/${id}`).update({
            views: (article.views || 0) + 1
        });
    }
}

// --- Analytics ---

export interface PageView {
    id: string;
    page: string;
    referrer: string;
    userAgent: string;
    timestamp: Date;
    sessionId: string;
}

export interface AnalyticsEvent {
    id: string;
    type: string;
    page: string;
    data: Record<string, any>;
    timestamp: Date;
    sessionId: string;
}

export interface DailyStats {
    date: string;
    views: number;
    uniqueVisitors: number;
    events: number;
}

export async function trackPageView(data: Omit<PageView, 'id'>) {
    const payload = {
        ...data,
        timestamp: data.timestamp.toISOString()
    };
    return db.ref("analytics/pageViews").push(payload);
}

export async function trackEvent(data: Omit<AnalyticsEvent, 'id'>) {
    const payload = {
        ...data,
        timestamp: data.timestamp.toISOString()
    };
    return db.ref("analytics/events").push(payload);
}

export async function getPageViews(days: number = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const snapshot = await db.ref("analytics/pageViews")
        .orderByChild("timestamp")
        .startAt(startDate.toISOString())
        .once("value");

    const data = snapshot.val();
    if (!data) return [];

    return Object.entries(data).map(([id, val]: [string, any]) => ({
        id,
        ...val,
        timestamp: new Date(val.timestamp)
    })) as PageView[];
}

export async function getAnalyticsEvents(days: number = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const snapshot = await db.ref("analytics/events")
        .orderByChild("timestamp")
        .startAt(startDate.toISOString())
        .once("value");

    const data = snapshot.val();
    if (!data) return [];

    return Object.entries(data).map(([id, val]: [string, any]) => ({
        id,
        ...val,
        timestamp: new Date(val.timestamp)
    })) as AnalyticsEvent[];
}

export async function getDailyStats(days: number = 30): Promise<DailyStats[]> {
    const pageViews = await getPageViews(days);
    const events = await getAnalyticsEvents(days);

    const statsMap: Record<string, DailyStats> = {};

    // Initialize days
    for (let i = 0; i < days; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        statsMap[dateStr] = {
            date: dateStr,
            views: 0,
            uniqueVisitors: 0,
            events: 0
        };
    }

    // Count page views and unique visitors
    const visitorsByDay: Record<string, Set<string>> = {};

    pageViews.forEach(pv => {
        const dateStr = pv.timestamp.toISOString().split('T')[0];
        if (statsMap[dateStr]) {
            statsMap[dateStr].views++;
            if (!visitorsByDay[dateStr]) {
                visitorsByDay[dateStr] = new Set();
            }
            visitorsByDay[dateStr].add(pv.sessionId);
        }
    });

    // Set unique visitors
    Object.entries(visitorsByDay).forEach(([date, visitors]) => {
        if (statsMap[date]) {
            statsMap[date].uniqueVisitors = visitors.size;
        }
    });

    // Count events
    events.forEach(ev => {
        const dateStr = ev.timestamp.toISOString().split('T')[0];
        if (statsMap[dateStr]) {
            statsMap[dateStr].events++;
        }
    });

    return Object.values(statsMap).sort((a, b) => a.date.localeCompare(b.date));
}

export async function getTopPages(days: number = 30): Promise<{ page: string; views: number; uniqueVisitors: number }[]> {
    const pageViews = await getPageViews(days);

    const pageStats: Record<string, { views: number; sessions: Set<string> }> = {};
    pageViews.forEach(pv => {
        if (!pageStats[pv.page]) {
            pageStats[pv.page] = { views: 0, sessions: new Set() };
        }
        pageStats[pv.page].views += 1;
        pageStats[pv.page].sessions.add(pv.sessionId);
    });

    return Object.entries(pageStats)
        .map(([page, stats]) => ({
            page,
            views: stats.views,
            uniqueVisitors: stats.sessions.size
        }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 10);
}

export async function getTotalStats(days: number = 30) {
    const pageViews = await getPageViews(days);
    const events = await getAnalyticsEvents(days);

    const uniqueVisitors = new Set(pageViews.map(pv => pv.sessionId)).size;

    return {
        totalViews: pageViews.length,
        uniqueVisitors,
        totalEvents: events.length,
        avgViewsPerVisitor: uniqueVisitors > 0 ? Math.round(pageViews.length / uniqueVisitors * 10) / 10 : 0
    };
}
