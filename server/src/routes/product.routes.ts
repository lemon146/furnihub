import { Router } from "express";
import { createProduct } from "../controllers/product.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer.middleware";
import { createProductSchema } from "../middlewares/product.validator";
import { authorizeRoles } from "../middlewares/role.middleware";
import { validate } from "../middlewares/validate.middleware";

const router = Router();

router
  .route("/")
  .post(
    isAuthenticated,
    authorizeRoles("ADMIN"),
    upload.array("image", 5),
    validate(createProductSchema),
    createProduct,
  );

export default router;
