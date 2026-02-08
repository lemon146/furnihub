import jwt, { JwtPayload } from "jsonwebtoken";
import { IUser, User } from "../models/user.models";
import { ApiError } from "../utils/apiError";
import { asyncHandler } from "./asyncHandler";

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}

export const isUserValid = asyncHandler(async (req, res, next) => {
  // get token from cookie
  const token = req.cookies?.accessToken;

  if (!token) {
    throw new ApiError(401, "Access token not found");
  }

  // verify & decode token
  const decoded = jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET!,
  ) as JwtPayload;

  if (!decoded?._id) {
    throw new ApiError(401, "Invalid access token");
  }

  // get user from DB
  const user = await User.findById(decoded._id).select("-password");

  if (!user) {
    throw new ApiError(401, "User not found");
  }

  // attach user to request
  req.user = user;

  next();
});
