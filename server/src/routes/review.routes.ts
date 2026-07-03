import { Router } from "express";
import {
  createReviews,
  deleteReplyReview,
  deleteReviews,
  getReviews,
  replyReview,
  updateReplyReview,
  updateReviews,
} from "../controllers/reviews.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = Router();

// Review CRUD
router.route("/:id").post(isAuthenticated, createReviews);

router.route("/:id").patch(isAuthenticated, updateReviews);

router
  .route("/:id")
  .delete(isAuthenticated, authorizeRoles("USER", "ADMIN"), deleteReviews);

router.route("/:id").get(getReviews);

// Reply CRUD (Admin only)
router
  .route("/:id/reply")
  .post(isAuthenticated, authorizeRoles("ADMIN"), replyReview)
  .patch(isAuthenticated, authorizeRoles("ADMIN"), updateReplyReview)
  .delete(isAuthenticated, authorizeRoles("ADMIN"), deleteReplyReview);

export default router;
