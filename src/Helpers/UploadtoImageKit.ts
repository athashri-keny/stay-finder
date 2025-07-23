import { imagekit } from "@/lib/ImageKit.";


export async function uploadToImageKit(file: File, folder?: string): Promise<string> {
  try {
    // converting files
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadOptions: any = {
      file: buffer,
      fileName: file.name,
    };

    if (folder) {
      uploadOptions.folder = folder;
    }

    const response = await imagekit.upload(uploadOptions);

    return response.url;
  } catch (error) {
    console.error("ImageKit upload failed:", error);
    throw new Error("Image upload failed");
  }
}