import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/apiError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Sorry, the server is currently down. Please try again later.",
  });
};
