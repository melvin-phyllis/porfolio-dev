"use server";

import imagekit from "@/lib/imagekit";
import { randomUUID } from "crypto";

export async function uploadImage(formData: FormData) {
    try {
        const file = formData.get("file") as File;
        if (!file) {
            return { error: "No file provided" };
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = `${randomUUID()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

        const uploadResponse = await imagekit.upload({
            file: buffer, // ImageKit accepts Buffer, Base64, or URL
            fileName: filename,
            folder: "/portfolio", // Optional: organize uploads
        });

        return { url: uploadResponse.url };

    } catch (error) {
        console.error("Upload Error:", error);
        return { error: "Upload failed" };
    }
}
