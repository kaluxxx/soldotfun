import {put} from "@vercel/blob";

export async function handleBase64Image(base64Image: string): Promise<string> {
    if (!base64Image.startsWith("data:image/")) {
        throw new Error("Invalid image format.");
    }

    // Extraire les métadonnées (type MIME) et les données de l'image
    const [metadata, base64Data] = base64Image.split(',');
    const mimeType = metadata.match(/:(.*?);/)?.[1];

    if (!mimeType || !base64Data) {
        throw new Error("Invalid Base64 image data.");
    }

    // Convertir le Base64 en binaire
    const imageBuffer = Buffer.from(base64Data, 'base64');

    // Utiliser un nom de fichier unique si nécessaire
    const fileName = `image_${Date.now()}`;

    // Enregistrer le fichier en utilisant votre service de stockage (par exemple Vercel Blob)
    return await handleFileUpload(new File([imageBuffer], fileName, {type: mimeType}));
}

export async function handleFileUpload(file: File): Promise<string> {
    if (!file) {
        throw new Error("No file provided.");
    }
    const { url } = await put(file.name, file, {
        access: "public",
    });

    return url;
}