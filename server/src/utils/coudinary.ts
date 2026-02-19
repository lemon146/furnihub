import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { ApiError } from "./apiError";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_SECRET_KEY!,
});

const uploadFileOnCloudinary = async (filePath: string, folderName: string) => {
  try {
    if (!filePath) return null;

    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
      folder: `furniture/${folderName}`,
      public_id: `${folderName}-${Date.now()}`,
    });

    fs.unlinkSync(filePath); // cleanup after success

    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    throw new ApiError(500, "Error updating file");
  }
};

const deleteFileOnCloudinary = async (publicId: string) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw new Error(`Cloudinary delete failed: ${error}`);
  }
};
const updateNewFileOnCloudinary = async (
  oldPublicId: string | null,
  filePath: string,
  folderName: string,
) => {
  try {
    const upload = await uploadFileOnCloudinary(filePath, folderName);

    if (!upload) {
      throw new ApiError(500, "File upload failed");
    }

    if (oldPublicId) {
      try {
        await deleteFileOnCloudinary(oldPublicId);
      } catch (deleteError) {
        console.error("Old file deletion failed:", deleteError);
      }
    }

    return {
      url: upload.url,
      public_id: upload.public_id,
    };
  } catch (error) {
    console.error("Cloudinary update error:", error);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    throw new ApiError(500, "Error updating file");
  }
};

export {
  deleteFileOnCloudinary,
  updateNewFileOnCloudinary,
  uploadFileOnCloudinary,
};
