import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
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

export { loginUser, logOutUser, refreshAccessToken, registerUser };
