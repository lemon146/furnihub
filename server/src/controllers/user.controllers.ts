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
  user.refreshTokens = "";

  res.status(201).json({
    success: true,
    message: "User created successfully",
    data: user,
  });
});

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  // find user (include password!)
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  // check password
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  //  generate tokens
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  //  save refresh token
  user.refreshTokens = refreshToken;
  await user.save({ validateBeforeSave: false });

  //  send cookies
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
      success: true,
      message: "User logged in successfully",
      user: {
        _id: user._id,
        email: user.email,
      },
    });
});

const logOutUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(401, "Unauthorized");
  }

  // remove refresh token from DB
  user.refreshTokens = "";
  await user.save({ validateBeforeSave: false });

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
  };

  res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json({
      success: true,
      message: "Logout successful",
    });
});

export { loginUser, logOutUser, registerUser };
