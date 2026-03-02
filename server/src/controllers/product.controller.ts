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
const updateProduct = asyncHandler(async (req, res) => {
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
  const { id } = req.params;
  const files = req.files as Express.Multer.File[] | undefined;

  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(400, "Product Not Found");
  }
  if (files?.length) {
    const newImages: { url: string; publicId: string }[] = [];

    for (const file of files) {
      const upload = await uploadFileOnCloudinary(file.path, "Product");

      if (!upload) {
        throw new ApiError(500, "Image upload failed");
      }

      newImages.push({
        url: upload.url,
        publicId: upload.public_id,
      });
    }

    //  Delete old images only after upload success
    await Promise.all(
      product.images.map((img) => deleteFileOnCloudinary(img.publicId)),
    );

    product.images = newImages as any;
  }

  if (title) {
    product.title = title;
  }
  if (description) {
    product.description = description;
  }
  if (short_desc) {
    product.short_desc = short_desc;
  }
  if (category) {
    product.category = category;
  }
  if (material) {
    product.additionalInfo.material = material;
  }
  if (color) {
    product.additionalInfo.color = color;
  }
  if (weight) {
    product.additionalInfo.weight = weight;
  }
  if (dimension) {
    product.additionalInfo.dimension = dimension;
  }
  if (originalPrice) {
    product.originalPrice = originalPrice;
  }
  if (price !== undefined) {
    product.price = price;
  }
  if (stock) {
    product.stock = stock;
  }
  await product.save();
  return res.status(200).json({
    success: true,
    message: "Product update successfully",
  });
});
// fetch all product
const fetchAllProduct = asyncHandler(async (req, res) => {
  const product = await Product.find();
  if (!product) throw new ApiError(404, "Product not Found");
  return res.status(200).json({
    success: true,
    message: "product fetch successfully",
    product: product,
  });
});
export { createProduct, deleteProduct, fetchAllProduct, updateProduct };
