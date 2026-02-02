import { Router } from "express";
import { registerUser } from "../controllers/user.controllers";
import { registerSchema, validate } from "../middlewares/user.validator";

const router = Router();

router.route("/register").post(validate(registerSchema), registerUser);

export default router;
