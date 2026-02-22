import { trackEvent } from "@/lib/firebase-db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        // Ignore admin visits
        const hasSession = request.cookies.toString().includes("next-auth.session-token");
        if (hasSession) {
            return NextResponse.json({ success: true, ignored: true });
        }

        const body = await request.json();
        const { type, page, data, sessionId } = body;

        if (!type || !sessionId || !page) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        await trackEvent({
            type,
            page,
            data: data || {},
            sessionId,
            timestamp: new Date(),
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error tracking event:", error);
        return NextResponse.json(
            { error: "Failed to track event" },
            { status: 500 }
        );
    }
}
