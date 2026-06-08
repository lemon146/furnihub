import { z } from "zod";

export const createProductSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").trim(),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .trim(),

  short_desc: z
    .string()
    .min(5, "Short description must be at least 5 characters")
    .trim(),

  category: z.string().min(1, "Category is required"),

  material: z.string().min(1, "Material is required"),

  color: z.string().min(1, "Color is required"),

  weight: z.coerce.number().min(1, "Weight is required"),

  dimension: z.string().min(1, "Dimension is required"),

  price: z.coerce.number().min(0, "Price must be greater than or equal to 0"),

  originalPrice: z.coerce
    .number()
    .min(0, "Original price must be greater than or equal to 0"),

  stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
});
