/**
 * Vercel Analytics API Integration
 *
 * Pour activer cette fonctionnalité, vous devez:
 * 1. Créer un token API sur https://vercel.com/account/tokens
 * 2. Ajouter les variables d'environnement suivantes dans .env:
 *    - VERCEL_API_TOKEN=your_token_here
 *    - VERCEL_PROJECT_ID=your_project_id (trouvable dans les settings du projet)
 *    - VERCEL_TEAM_ID=your_team_id (optionnel, si vous utilisez un team)
 */

const VERCEL_API_URL = "https://api.vercel.com";

interface VercelAnalyticsData {
    pageViews: number;
    visitors: number;
    bounceRate: number;
    avgDuration: number;
}

interface VercelTopPage {
    path: string;
    views: number;
}

interface VercelReferrer {
    referrer: string;
    views: number;
}

export async function isVercelAnalyticsConfigured(): Promise<boolean> {
    return !!(process.env.VERCEL_API_TOKEN && process.env.VERCEL_PROJECT_ID);
}

async function fetchVercelAPI<T>(endpoint: string): Promise<T | null> {
    const token = process.env.VERCEL_API_TOKEN;
    const projectId = process.env.VERCEL_PROJECT_ID;
    const teamId = process.env.VERCEL_TEAM_ID;

    if (!token || !projectId) {
        console.warn("Vercel API credentials not configured");
        return null;
    }

    const url = new URL(`${VERCEL_API_URL}${endpoint}`);
    url.searchParams.set("projectId", projectId);
    if (teamId) {
        url.searchParams.set("teamId", teamId);
    }

    try {
        const response = await fetch(url.toString(), {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            next: { revalidate: 3600 }, // Cache for 1 hour
        });

        if (!response.ok) {
            // Silently fail in development to avoid console spam
            if (process.env.NODE_ENV === "development") {
                return null;
            }
            console.error(`Vercel API error: ${response.status}`);
            return null;
        }

        return response.json();
    } catch (error) {
        console.error("Vercel API fetch error:", error);
        return null;
    }
}

export async function getVercelAnalyticsSummary(
    days: number = 30
): Promise<VercelAnalyticsData | null> {
    // Return mock data in development
    if (process.env.NODE_ENV === "development") {
        return {
            pageViews: 1250,
            visitors: 340,
            bounceRate: 0.45,
            avgDuration: 125,
        };
    }

    const now = new Date();
    const start = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    const data = await fetchVercelAPI<{
        total: {
            pageViews: number;
            visitors: number;
            bounceRate: number;
            avgDuration: number;
        };
    }>(`/v1/web/insights?from=${start.toISOString()}&to=${now.toISOString()}`);

    if (!data?.total) return null;

    return {
        pageViews: data.total.pageViews,
        visitors: data.total.visitors,
        bounceRate: Math.round(data.total.bounceRate * 100) / 100,
        avgDuration: Math.round(data.total.avgDuration),
    };
}

export async function getVercelTopPages(
    days: number = 30,
    limit: number = 10
): Promise<VercelTopPage[]> {
    // Return mock data in development
    if (process.env.NODE_ENV === "development") {
        return [
            { path: "/", views: 450 },
            { path: "/projects", views: 230 },
            { path: "/about", views: 180 },
            { path: "/blog", views: 120 },
            { path: "/contact", views: 85 },
        ].slice(0, limit);
    }

    const now = new Date();
    const start = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    const data = await fetchVercelAPI<{
        data: Array<{ key: string; total: number }>;
    }>(`/v1/web/insights/stats/path?from=${start.toISOString()}&to=${now.toISOString()}&limit=${limit}`);

    if (!data?.data) return [];

    return data.data.map((item) => ({
        path: item.key,
        views: item.total,
    }));
}

export async function getVercelReferrers(
    days: number = 30,
    limit: number = 10
): Promise<VercelReferrer[]> {
    // Return mock data in development
    if (process.env.NODE_ENV === "development") {
        return [
            { referrer: "Google", views: 280 },
            { referrer: "Direct", views: 150 },
            { referrer: "LinkedIn", views: 95 },
            { referrer: "GitHub", views: 65 },
            { referrer: "Twitter", views: 45 },
        ].slice(0, limit);
    }

    const now = new Date();
    const start = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    const data = await fetchVercelAPI<{
        data: Array<{ key: string; total: number }>;
    }>(`/v1/web/insights/stats/referrer?from=${start.toISOString()}&to=${now.toISOString()}&limit=${limit}`);

    if (!data?.data) return [];

    return data.data.map((item) => ({
        referrer: item.key || "Direct",
        views: item.total,
    }));
}

export async function getVercelDevices(days: number = 30): Promise<{
    desktop: number;
    mobile: number;
    tablet: number;
} | null> {
    const now = new Date();
    const start = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    const data = await fetchVercelAPI<{
        data: Array<{ key: string; total: number }>;
    }>(`/v1/web/insights/stats/device?from=${start.toISOString()}&to=${now.toISOString()}`);

    if (!data?.data) return null;

    const devices = { desktop: 0, mobile: 0, tablet: 0 };
    data.data.forEach((item) => {
        const key = item.key.toLowerCase() as keyof typeof devices;
        if (key in devices) {
            devices[key] = item.total;
        }
    });

    return devices;
}

export async function getVercelCountries(
    days: number = 30,
    limit: number = 10
): Promise<Array<{ country: string; views: number }>> {
    const now = new Date();
    const start = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    const data = await fetchVercelAPI<{
        data: Array<{ key: string; total: number }>;
    }>(`/v1/web/insights/stats/country?from=${start.toISOString()}&to=${now.toISOString()}&limit=${limit}`);

    if (!data?.data) return [];

    return data.data.map((item) => ({
        country: item.key || "Unknown",
        views: item.total,
    }));
}
