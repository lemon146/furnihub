import { Router } from "express";
import {
  changeCurrentPassword,
  getCurrentUser,
  loginUser,
  logOutUser,
  refreshAccessToken,
  registerUser,
} from "../controllers/user.controllers";
import { isUserValid } from "../middlewares/auth.middleware";
import { registerSchema, validate } from "../middlewares/user.validator";

const router = Router();

router.route("/register").post(validate(registerSchema), registerUser);
router.route("/login").post(loginUser);

//secure route
router.route("/logout").post(isUserValid, logOutUser);
router.route("/refresh/token").post(refreshAccessToken);
router.route("/change/password").patch(isUserValid, changeCurrentPassword);
router.route("/current/user").get(isUserValid, getCurrentUser);

export default router;
