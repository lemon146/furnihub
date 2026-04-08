import { Express, Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import {
  createReviews,
  deleteReviews,
  getReviews,
  updateReviews,
} from "../controllers/reviews.controller";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = Router();

router.route("/:id").post(isAuthenticated, createReviews);
router.route("/:id").patch(isAuthenticated, updateReviews);
router
  .route("/:id")
  .delete(isAuthenticated, authorizeRoles("USER", "ADMIN"), deleteReviews);
router.route("/:id").get(isAuthenticated, getReviews);

export default router;
