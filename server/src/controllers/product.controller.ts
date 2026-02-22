import { asyncHandler } from "../middlewares/asyncHandler";
import { Category } from "../models/category.models";
import { Product } from "../models/product.models";
import { ApiError } from "../utils/apiError";
import {
  deleteFileOnCloudinary,
  uploadFileOnCloudinary,
} from "../utils/coudinary";

const createProduct = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    short_desc,
    category,
    material,
    color,
    weight,
    dimension,
    originalPrice,
    price,
    stock,
  } = req.body;

  const { _id } = req.user;
  const images = req.files as Express.Multer.File[];
  if (!images) {
    throw new ApiError(400, "images required");
  }

  // check category exist
  const categoryCheck = await Category.findById({ _id: category });
  if (!categoryCheck) {
    throw new ApiError(404, "Category Not Found");
  }

  // upload images on cloudinary
  const uploadedImages = [];
  for (const file of images) {
    const upload = await uploadFileOnCloudinary(file.path, "Product");
    uploadedImages.push(upload);
  }
  await Product.create({
    title,
    description,
    short_desc,
    price,
    originalPrice,
    additionalInfo: {
      material,
      color,
      weight,
      dimension,
    },
    category,
    images: uploadedImages.map((img) => ({
      url: img?.url,
      publicId: img?.public_id,
    })),
    createdBy: _id,
    stock,
  });
  return res.status(201).json({
    success: true,
    message: "Product Create successfully",
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(400, "id required");
  }
  //  check product exist
  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(404, "Product Not Found");
  }
  await Promise.all(
    product.images.map((image) => deleteFileOnCloudinary(image.publicId)),
  );
  await product.deleteOne();
  return res.status(200).json({
    success: true,
    message: "Product delete successfully",
    product: product,
  });
});

export { createProduct, deleteProduct };
