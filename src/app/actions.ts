"use server";

import { Resend } from "resend";

import { getProfile } from "@/lib/firebase-db";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !subject || !message) {
        return { error: "Veuillez remplir tous les champs." };
    }

    try {
        const profile = await getProfile();
        const destinationEmail = profile?.email || "melvinphyllisakou@gmail.com"; // Fallback to verified Resend email

        const data = await resend.emails.send({
            from: "Portfolio Contact <onboarding@resend.dev>", // Default free domain from Resend
            to: [destinationEmail], // Replace with user's email or default
            subject: `Nouveau message de ${name}: ${subject}`,
            replyTo: email,
            text: `Message de: ${name} (${email})\n\n${message}`,
            html: `
        <h1>Nouveau message de contact</h1>
        <p><strong>De:</strong> ${name} (${email})</p>
        <p><strong>Sujet:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
        });

        if (data.error) {
            console.error("❌ Resend error details:", JSON.stringify(data.error, null, 2));
            return { error: `Erreur Resend: ${data.error.message}` };
        }

        return { success: true };
    } catch (error) {
        console.error("Server error:", error);
        return { error: "Une erreur serveur est survenue." };
    }
}
