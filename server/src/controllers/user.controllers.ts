import { asyncHandler } from "../middlewares/asyncHandler";

import { Request, Response } from "express";
import { User } from "../models/user.models";
import { ApiError } from "../utils/apiError";

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;
  if ([fullName, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All field are required");
  }
  // check if email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "Email already exists");
  }

  // create user
  const user = new User({
    email,
    fullName,
    password,
  });

  await user.save();

  // remove password from response
  user.password = "";
  user.refreshTokens = [""];

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: user,
  });
});

export { registerUser };
