import { Router } from "express";
import {
  createReviews,
  deleteReviews,
  getReviews,
  updateReviews,
} from "../controllers/reviews.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = Router();

router.route("/:id").post(isAuthenticated, createReviews);
router.route("/:id").patch(isAuthenticated, updateReviews);
router
  .route("/:id")
  .delete(isAuthenticated, authorizeRoles("USER", "ADMIN"), deleteReviews);
router.route("/:id").get(getReviews);

export default router;
