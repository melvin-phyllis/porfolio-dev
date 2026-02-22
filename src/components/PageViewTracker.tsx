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
        let viewId: string | null = null;
        const startTime = Date.now();

        const trackView = async () => {
            try {
                const sessionId = generateSessionId();
                if (!sessionId) return;

                const response = await fetch("/api/analytics/pageview", {
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

                const data = await response.json();
                if (data.success && data.viewId) {
                    viewId = data.viewId;
                }
            } catch (error) {
                console.error("Failed to track page view:", error);
            }
        };

        trackView();

        return () => {
            if (viewId) {
                const duration = Math.floor((Date.now() - startTime) / 1000); // in seconds

                // Using navigator.sendBeacon is more reliable for requests during unmount
                try {
                    const data = JSON.stringify({ viewId, duration });
                    const blob = new Blob([data], { type: 'application/json' });
                    navigator.sendBeacon("/api/analytics/pageview", blob);
                } catch (e) {
                    // Fallback to fetch if sendBeacon fails or isn't supported
                    fetch("/api/analytics/pageview", {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ viewId, duration }),
                        keepalive: true,
                    }).catch(() => { });
                }
            }
        };
    }, [pathname]);

    return null;
}
