import Router from "express";
import { createCategory } from "../controllers/category.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = Router();

router
  .route("/create")
  .post(
    isAuthenticated,
    authorizeRoles("ADMIN"),
    upload.single("image"),
    createCategory,
  );

export default router;
