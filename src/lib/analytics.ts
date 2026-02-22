import { track } from "@vercel/analytics";

export type EventName =
    | "page_view"
    | "project_click"
    | "project_demo_click"
    | "project_github_click"
    | "article_view"
    | "article_click"
    | "contact_form_submit"
    | "contact_form_success"
    | "contact_form_error"
    | "skill_hover"
    | "cv_download"
    | "social_link_click";

interface EventProperties {
    [key: string]: string | number | boolean | undefined;
}

function generateSessionId(): string {
    if (typeof window === "undefined") return "";

    let sessionId = sessionStorage.getItem("analytics_session_id");
    if (!sessionId) {
        sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        sessionStorage.setItem("analytics_session_id", sessionId);
    }
    return sessionId;
}

export function trackEvent(eventName: EventName, properties?: EventProperties) {
    try {
        // 1. Track with Vercel Analytics
        track(eventName, properties);

        // 2. Track with custom Firebase DB
        if (typeof window !== "undefined") {
            const sessionId = generateSessionId();
            if (sessionId) {
                fetch("/api/analytics/event", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        type: eventName,
                        page: window.location.pathname,
                        data: properties || {},
                        sessionId,
                    }),
                }).catch(() => { });
            }
        }
    } catch (error) {
        console.error("Failed to track event:", error);
    }
}

export function trackProjectClick(projectId: string, projectTitle: string) {
    trackEvent("project_click", {
        project_id: projectId,
        project_title: projectTitle,
    });
}

export function trackProjectDemoClick(projectId: string, projectTitle: string, url: string) {
    trackEvent("project_demo_click", {
        project_id: projectId,
        project_title: projectTitle,
        url,
    });
}

export function trackProjectGithubClick(projectId: string, projectTitle: string, url: string) {
    trackEvent("project_github_click", {
        project_id: projectId,
        project_title: projectTitle,
        url,
    });
}

export function trackArticleView(articleId: string, articleTitle: string, category: string) {
    trackEvent("article_view", {
        article_id: articleId,
        article_title: articleTitle,
        category,
    });
}

export function trackArticleClick(articleId: string, articleTitle: string) {
    trackEvent("article_click", {
        article_id: articleId,
        article_title: articleTitle,
    });
}

export function trackContactFormSubmit() {
    trackEvent("contact_form_submit");
}

export function trackContactFormSuccess() {
    trackEvent("contact_form_success");
}

export function trackContactFormError(error: string) {
    trackEvent("contact_form_error", { error });
}

export function trackCVDownload() {
    trackEvent("cv_download");
}

export function trackSocialLinkClick(platform: string, url: string) {
    trackEvent("social_link_click", { platform, url });
}
