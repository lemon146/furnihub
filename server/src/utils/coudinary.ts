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

    console.log("file upload success:", result.secure_url);

    fs.unlinkSync(filePath); // cleanup after success

    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    throw new ApiError(400, `Error uploading file to Cloudinary ${error}`);
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
  oldPublicId: string,
  newPublicId: string,
  folderName: string,
) => {
  const upload = await uploadFileOnCloudinary(newPublicId, folderName);
  if (oldPublicId) {
    await deleteFileOnCloudinary(oldPublicId);
  }
};

export {
  deleteFileOnCloudinary,
  updateNewFileOnCloudinary,
  uploadFileOnCloudinary,
};
