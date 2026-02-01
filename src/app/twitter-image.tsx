import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Marie Danielle Akpeuby - Développeuse Fullstack & DevOps";
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = "image/png";

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: "linear-gradient(135deg, #000000 0%, #1a1a2e 100%)",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "48px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "24px",
                        marginBottom: "32px",
                    }}
                >
                    <div
                        style={{
                            width: "120px",
                            height: "120px",
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "48px",
                            fontWeight: "bold",
                            color: "white",
                        }}
                    >
                        M
                    </div>
                </div>
                <h1
                    style={{
                        fontSize: "64px",
                        fontWeight: "bold",
                        color: "white",
                        textAlign: "center",
                        marginBottom: "16px",
                    }}
                >
                    Marie Danielle Akpeuby
                </h1>
                <p
                    style={{
                        fontSize: "36px",
                        color: "#a78bfa",
                        textAlign: "center",
                        marginBottom: "32px",
                    }}
                >
                    Développeuse Fullstack & DevOps
                </p>
                <div
                    style={{
                        display: "flex",
                        gap: "16px",
                        fontSize: "24px",
                        color: "#9ca3af",
                    }}
                >
                    <span>React</span>
                    <span>•</span>
                    <span>Next.js</span>
                    <span>•</span>
                    <span>Node.js</span>
                    <span>•</span>
                    <span>Docker</span>
                    <span>•</span>
                    <span>Kubernetes</span>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
