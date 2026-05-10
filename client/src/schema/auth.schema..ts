import { z } from "zod";

// register schema
export const registerSchema = z.object({
  fullName: z.string().min(3, "Name is too short"),
  email: z.email(),

  password: z.string().min(6, "Password must be at least 6 chars"),
});

export type RegisterInput = z.infer<typeof registerSchema>;

// login schema
export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6, "Password must be at least 6 chars"),
});

export type LoginInput = z.infer<typeof loginSchema>;
