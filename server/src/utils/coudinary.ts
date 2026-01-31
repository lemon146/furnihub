import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { ApiError } from "./apiError";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const uploadFileOnCloudinary = async (filePath: string) => {
  try {
    if (!filePath) return null;

    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
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
    throw new ApiError(400, "Error uploading file to Cloudinary");
  }
};

export { uploadFileOnCloudinary };
