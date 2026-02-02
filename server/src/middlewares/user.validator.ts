import { NextFunction, Request, Response } from "express";
import { z } from "zod";

// Zod schema
export const registerSchema = z.object({
  email: z.string().email("Invalid email"),
  fullName: z.string().min(3, "Name too short"),
  password: z.string().min(6, "Password must be 6+ chars"),
});

// Infer TS type from schema
export type RegisterSchemaType = z.infer<typeof registerSchema>;

// Validation middleware
export const validate =
  (schema: z.ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    schema.parse(req.body);
    next();
  };
