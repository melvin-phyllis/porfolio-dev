import { trackPageView } from "@/lib/firebase-db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const { page, referrer, userAgent, sessionId } = body;

        if (!page || !sessionId) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        await trackPageView({
            page,
            referrer: referrer || "",
            userAgent: userAgent || "",
            sessionId,
            timestamp: new Date(),
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error tracking page view:", error);
        return NextResponse.json(
            { error: "Failed to track page view" },
            { status: 500 }
        );
    }
}
