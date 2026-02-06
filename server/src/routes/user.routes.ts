import { Router } from "express";
import {
  loginUser,
  logOutUser,
  registerUser,
} from "../controllers/user.controllers";
import { isUserValid } from "../middlewares/auth.middleware";
import { registerSchema, validate } from "../middlewares/user.validator";

const router = Router();

router.route("/register").post(validate(registerSchema), registerUser);
router.route("/login").post(loginUser);

//secure route
router.route("/logout").post(isUserValid, logOutUser);

export default router;
