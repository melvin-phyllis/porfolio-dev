/**
 * Service de traduction automatique
 * Utilise l'API Google Translate gratuite (pas de clé API requise)
 */

// Cache des traductions pour éviter de traduire plusieurs fois le même texte
const translationCache = new Map<string, string>();

/**
 * Traduit un texte du français vers l'anglais
 */
export async function translateToEnglish(text: string): Promise<string> {
    if (!text || text.trim() === "") return text;

    // Vérifier le cache
    const cacheKey = `fr_en_${text}`;
    if (translationCache.has(cacheKey)) {
        return translationCache.get(cacheKey)!;
    }

    try {
        // Utiliser l'API Google Translate gratuite
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=fr&tl=en&dt=t&q=${encodeURIComponent(text)}`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            console.error("Translation API error:", response.status);
            return text; // Retourner le texte original en cas d'erreur
        }

        const data = await response.json();

        // L'API retourne un tableau imbriqué, le texte traduit est dans data[0]
        let translatedText = "";
        if (data && data[0]) {
            for (const segment of data[0]) {
                if (segment[0]) {
                    translatedText += segment[0];
                }
            }
        }

        // Mettre en cache
        if (translatedText) {
            translationCache.set(cacheKey, translatedText);
            return translatedText;
        }

        return text;
    } catch (error) {
        console.error("Translation error:", error);
        return text; // Retourner le texte original en cas d'erreur
    }
}

/**
 * Traduit un objet avec plusieurs champs textuels
 */
export async function translateObject<T extends object>(
    obj: T,
    fieldsToTranslate: (keyof T)[],
    targetLocale: string
): Promise<T> {
    // Ne traduire que si la locale cible est l'anglais
    if (targetLocale === "fr") {
        return obj;
    }

    const translatedObj = { ...obj };

    for (const field of fieldsToTranslate) {
        const value = obj[field];
        if (typeof value === "string" && value.trim() !== "") {
            (translatedObj as Record<string, unknown>)[field as string] = await translateToEnglish(value);
        }
    }

    return translatedObj;
}

/**
 * Traduit un tableau d'objets
 */
export async function translateArray<T extends object>(
    items: T[],
    fieldsToTranslate: (keyof T)[],
    targetLocale: string
): Promise<T[]> {
    if (targetLocale === "fr") {
        return items;
    }

    return Promise.all(
        items.map((item) => translateObject(item, fieldsToTranslate, targetLocale))
    );
}
