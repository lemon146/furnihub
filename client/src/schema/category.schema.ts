import { z } from "zod";

export const CategorySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").trim(),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters"),

  image: z.any().refine((files) => files?.length === 1, "Image is required"),
});

export type CategoryType = z.infer<typeof CategorySchema>;
