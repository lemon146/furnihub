import fs from "fs";
import { createHash } from "crypto";
import { ApiError } from "./apiError";

const getCredentials = () => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME!;
  const apiKey = process.env.CLOUDINARY_API_KEY!;
  const apiSecret = process.env.CLOUDINARY_API_SECRET!;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new ApiError(500, "Cloudinary credentials missing");
  }

  return { cloudName, apiKey, apiSecret };
};

const generateSignature = (
  params: Record<string, string>,
  apiSecret: string,
) => {
  const sorted = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  return createHash("sha256").update(`${sorted}${apiSecret}`).digest("hex");
};

const uploadFileOnCloudinary = async (filePath: string, folderName: string) => {
  try {
    if (!filePath) return null;

    const { cloudName, apiKey, apiSecret } = getCredentials();
    const timestamp = Math.round(Date.now() / 1000).toString();
    const publicId = `${folderName}-${Date.now()}`;
    const folder = `furniture/${folderName}`;

    const signature = generateSignature(
      { folder, public_id: publicId, timestamp },
      apiSecret,
    );

    const formData = new FormData();
    formData.append(
      "file",
      new Blob([fs.readFileSync(filePath)]),
      "upload.png",
    );
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);
    formData.append("folder", folder);
    formData.append("public_id", publicId);
    formData.append("resource_type", "auto");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: formData },
    );

    const result = (await response.json()) as any;

    if (!response.ok) {
      throw new Error(result?.error?.message || "Upload failed");
    }

    fs.unlinkSync(filePath);

    return {
      url: result.secure_url as string,
      public_id: result.public_id as string,
    };
  } catch (error) {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    console.error("Upload error:", error);
    throw new ApiError(500, `Upload failed: ${(error as Error).message}`);
  }
};

const deleteFileOnCloudinary = async (publicId: string) => {
  try {
    const { cloudName, apiKey, apiSecret } = getCredentials();
    const timestamp = Math.round(Date.now() / 1000).toString();

    const signature = generateSignature(
      { public_id: publicId, timestamp },
      apiSecret,
    );

    const formData = new FormData();
    formData.append("public_id", publicId);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
      { method: "POST", body: formData },
    );

    const result = (await response.json()) as any;

    if (!response.ok) {
      throw new Error(result?.error?.message || "Delete failed");
    }

    return result;
  } catch (error) {
    console.error("Delete error:", error);
    throw new ApiError(500, `Delete failed: ${(error as Error).message}`);
  }
};

const updateNewFileOnCloudinary = async (
  oldPublicId: string | null,
  filePath: string,
  folderName: string,
) => {
  const upload = await uploadFileOnCloudinary(filePath, folderName);

  if (!upload) throw new ApiError(500, "File upload failed");

  if (oldPublicId) {
    await deleteFileOnCloudinary(oldPublicId).catch((err) =>
      console.error("Old file deletion failed:", err),
    );
  }

  return {
    url: upload.url,
    public_id: upload.public_id,
  };
};

export {
  deleteFileOnCloudinary,
  updateNewFileOnCloudinary,
  uploadFileOnCloudinary,
};
