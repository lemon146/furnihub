import { Router } from "express";
import {
  changeCurrentPassword,
  getAllUser,
  getCurrentUser,
  loginUser,
  logOutUser,
  refreshAccessToken,
  registerUser,
} from "../controllers/user.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";
import { registerSchema } from "../middlewares/user.validator";
import { validate } from "../middlewares/validate.middleware";

const router = Router();

router.route("/register").post(validate(registerSchema), registerUser);
router.route("/login").post(loginUser);

//secure route
router.route("/logout").post(isAuthenticated, logOutUser);
router.route("/refresh/token").post(refreshAccessToken);
router.route("/change/password").patch(isAuthenticated, changeCurrentPassword);
router.route("/current/user").get(isAuthenticated, getCurrentUser);
router
  .route("/user/users")
  .get(isAuthenticated, authorizeRoles("ADMIN"), getAllUser);

export default router;
