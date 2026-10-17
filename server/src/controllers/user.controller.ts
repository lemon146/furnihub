import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import { asyncHandler } from "../middlewares/asyncHandler";
import { User } from "../models/user.models";
import { ApiError } from "../utils/apiError";

interface tokenPayload extends JwtPayload {
  _id: string;
}
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
    secure: true,
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

const refreshAccessToken = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) throw new ApiError(401, "Unauthorized");

  const refreshSecret = process.env.REFRESH_TOKEN_SECRET;
  if (!refreshSecret) throw new Error("Missing refresh secret");

  const decoded = jwt.verify(token, refreshSecret) as tokenPayload;

  const user = await User.findById(decoded._id);
  if (!user) throw new ApiError(401, "User not found");

  if (token !== user.refreshTokens)
    throw new ApiError(401, "Refresh token invalid");

  const accessToken = user.generateAccessToken();
  const newRefreshToken = user.generateRefreshToken();

  user.refreshTokens = newRefreshToken;
  await user.save({ validateBeforeSave: false });

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "strict" as const,
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000,
    })
    .cookie("refreshToken", newRefreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json({
      success: true,
      message: "Access token refreshed",
    });
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new ApiError(400, "Old password and new password are required");
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }

  user.password = newPassword;

  await user.save({ validateBeforeSave: false });

  return res.status(200).json({
    success: true,
    message: "Password successfully changed",
  });
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const user = req.user;
  return res.status(200).json({
    success: true,
    message: "currect user fetched successfully",
    user: user,
  });
});

// get all users except admin

const getAllUsers = asyncHandler(async (req, res) => {
  const user = await User.find({ role: "USER" })
    .select("-password -refreshToken")
    .sort({ createdAt: -1 })
    .lean();

  return res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    user,
    count: user.length,
  });
});
const deleteCustomer = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid customer ID");
  }

  const customer = await User.findOneAndDelete({ _id: id, role: "USER" });

  if (!customer) {
    throw new ApiError(404, "Customer not found");
  }

  return res.status(200).json({
    success: true,
    message: "Customer deleted successfully",
  });
});
export {
  changeCurrentPassword,
  deleteCustomer,
  getAllUsers,
  getCurrentUser,
  loginUser,
  logOutUser,
  refreshAccessToken,
  registerUser,
};
