import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  fetchAllProduct,
  fetchSingleProduct,
  updateProduct,
} from "../controllers/product.controller";
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
router
  .route("/:id")
  .delete(isAuthenticated, authorizeRoles("ADMIN"), deleteProduct);

router
  .route("/:id")
  .patch(
    isAuthenticated,
    authorizeRoles("ADMIN"),
    upload.array("image", 5),
    validate(createProductSchema),
    updateProduct,
  );

router.route("/").get(isAuthenticated, fetchAllProduct);
router.route("/:id").get(isAuthenticated, fetchSingleProduct);
export default router;
