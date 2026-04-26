import { z } from "zod";

export const ProductSchema = z
  .object({
    // Title
    title: z.string().min(3, "Title must be at least 3 characters").trim(),

    // Full description
    description: z
      .string()
      .min(10, "Description must be at least 10 characters")
      .trim(),

    // Short description
    short_desc: z
      .string()
      .min(5, "Short description must be at least 5 characters")
      .trim(),

    // Category (ID)
    category: z.string().min(1, "Category is required"),

    // Material
    material: z.string().min(1, "Material is required"),

    // Color
    color: z.string().min(1, "Color is required"),

    // Weight (number only)
    weight: z
      .number({
        required_error: "Weight is required",
        invalid_type_error: "Weight must be a number",
      })
      .min(0, "Weight must be >= 0"),
    // Dimensions
    dimension: z.string().min(1, "Dimension is required"),

    // Price
    price: z.number().min(0, "Price must be greater than or equal to 0"),

    // Original price
    originalPrice: z
      .number()
      .min(0, "Original price must be greater than or equal to 0"),

    // Stock
    stock: z
      .number()
      .int("Stock must be a whole number")
      .min(0, "Stock cannot be negative"),

    // Images
    images: z
      .array(z.string().url("Each image must be a valid URL"))
      .min(1, "At least one image is required"),
  })

  // Cross-field validation
  .refine((data) => data.originalPrice >= data.price, {
    message: "Original price must be greater than or equal to price",
    path: ["originalPrice"],
  });

export type ProductType = z.infer<typeof ProductSchema>;
