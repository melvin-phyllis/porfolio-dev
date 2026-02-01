import { getPublishedArticles } from "@/lib/firebase-db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const articles = await getPublishedArticles();
        return NextResponse.json(articles);
    } catch (error) {
        console.error("Failed to fetch articles:", error);
        return NextResponse.json([], { status: 500 });
    }
}
