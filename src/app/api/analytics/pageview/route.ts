import { trackPageView, updatePageViewDuration } from "@/lib/firebase-db";
import { NextRequest, NextResponse } from "next/server";

function parseUserAgent(ua: string) {
    const uaLower = ua.toLowerCase();
    let device = "Desktop";
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(uaLower)) {
        device = "Tablet";
    } else if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        device = "Mobile";
    }

    let os = "Unknown";
    if (uaLower.includes("win")) os = "Windows";
    else if (uaLower.includes("mac")) os = "macOS";
    else if (uaLower.includes("linux")) os = "Linux";
    else if (uaLower.includes("android")) os = "Android";
    else if (uaLower.includes("ios") || uaLower.includes("iphone") || uaLower.includes("ipad")) os = "iOS";

    return { device, os };
}

export async function POST(request: NextRequest) {
    try {
        // Ignore admin visits
        const hasSession = request.cookies.toString().includes("next-auth.session-token");
        if (hasSession) {
            return NextResponse.json({ success: true, ignored: true });
        }

        const body = await request.json();
        const { page, referrer, userAgent, sessionId } = body;

        if (!page || !sessionId) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const { device, os } = parseUserAgent(userAgent || "");

        // Vercel populates these headers automatically on deployments
        const country = request.headers.get("x-vercel-ip-country") || "Unknown";
        const city = request.headers.get("x-vercel-ip-city") || "Unknown";

        const viewId = await trackPageView({
            page,
            referrer: referrer || "",
            userAgent: userAgent || "",
            device,
            os,
            country,
            city,
            sessionId,
            timestamp: new Date(),
        });

        return NextResponse.json({ success: true, viewId });
    } catch (error) {
        console.error("Error tracking page view:", error);
        return NextResponse.json(
            { error: "Failed to track page view" },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { viewId, duration } = body;

        if (!viewId || typeof duration !== "number") {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        await updatePageViewDuration(viewId, duration);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error updating page view duration:", error);
        return NextResponse.json(
            { error: "Failed to update duration" },
            { status: 500 }
        );
    }
}
