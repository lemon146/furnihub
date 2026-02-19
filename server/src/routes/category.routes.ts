import Router from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "../controllers/category.controller";
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
router
  .route("/delete/:id")
  .delete(isAuthenticated, authorizeRoles("ADMIN"), deleteCategory);

router
  .route("/update/:id")
  .put(
    isAuthenticated,
    authorizeRoles("ADMIN"),
    upload.single("image"),
    updateCategory,
  );
router.route("/").get(isAuthenticated, getAllCategory);

export default router;
