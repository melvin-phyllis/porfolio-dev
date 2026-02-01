"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function generateSessionId(): string {
    if (typeof window === "undefined") return "";

    let sessionId = sessionStorage.getItem("analytics_session_id");
    if (!sessionId) {
        sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        sessionStorage.setItem("analytics_session_id", sessionId);
    }
    return sessionId;
}

export default function PageViewTracker() {
    const pathname = usePathname();

    useEffect(() => {
        const trackView = async () => {
            try {
                const sessionId = generateSessionId();
                if (!sessionId) return;

                await fetch("/api/analytics/pageview", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        page: pathname,
                        referrer: document.referrer || "",
                        userAgent: navigator.userAgent,
                        sessionId,
                    }),
                });
            } catch (error) {
                console.error("Failed to track page view:", error);
            }
        };

        trackView();
    }, [pathname]);

    return null;
}
