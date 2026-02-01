import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;

                    // Simple Env-based authentication
                    const adminEmail = process.env.ADMIN_EMAIL;
                    const adminPassword = process.env.ADMIN_PASSWORD;

                    // Debug logs (retirez en production)
                    console.log("Login attempt:", { email, password });
                    console.log("Expected:", { adminEmail, adminPassword });

                    if (email === adminEmail && password === adminPassword) {
                        return {
                            id: "1",
                            name: "Admin",
                            email: adminEmail,
                        };
                    }
                }

                console.log("Invalid credentials");
                return null;
            },
        }),
    ],
    // Simplified callbacks as we don't have DB complexity anymore
});
