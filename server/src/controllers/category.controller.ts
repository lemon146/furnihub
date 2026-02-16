import { asyncHandler } from "../middlewares/asyncHandler";
import { Category } from "../models/category.models";
import { ApiError } from "../utils/apiError";
import { uploadFileOnCloudinary } from "../utils/coudinary";

const createCategory = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const image = req.file;

  if (!title) {
    throw new ApiError(400, "Title is required");
  }

  if (!image) {
    throw new ApiError(400, "Image is required");
  }

  const existingCategory = await Category.findOne({
    title: { $regex: `^${title}$`, $options: "i" },
  });

  if (existingCategory) {
    throw new ApiError(409, "Category already exists");
  }

  const uploadedFile = await uploadFileOnCloudinary(image.path, "Categories");

  if (!uploadedFile?.url || !uploadedFile?.public_id) {
    throw new ApiError(500, "Image upload failed");
  }

  const category = await Category.create({
    title,
    image: {
      url: uploadedFile.url,
      public_id: uploadedFile.public_id,
    },
  });

  return res.status(201).json({
    success: true,
    message: "Category created successfully",
    data: category,
  });
});

const deleteCategory = asyncHandler(async (req, res) => {
  const id = req.params;

  if (!id) {
    throw new ApiError(409, "category id not found");
  }

  const category = await Category.findOne({ _id: id });
  if (!category) {
    throw new ApiError(401, "Category not found !");
  }
});

export { createCategory };
