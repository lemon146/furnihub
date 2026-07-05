import { Router } from "express";
import {
  createReviews,
  deleteReplyReview,
  deleteReviews,
  getAllReviews,
  getReviews,
  getReviewStats,
  replyReview,
  updateReplyReview,
  updateReviews,
} from "../controllers/reviews.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = Router();

// Admin routes
router.get("/", isAuthenticated, authorizeRoles("ADMIN"), getAllReviews);
router.get("/stats", isAuthenticated, authorizeRoles("ADMIN"), getReviewStats);

// Product review routes
router.post("/:id", isAuthenticated, createReviews);
router.patch("/:id", isAuthenticated, updateReviews);
router.delete(
  "/:id",
  isAuthenticated,
  authorizeRoles("USER", "ADMIN"),
  deleteReviews,
);
router.get("/:id", getReviews);

// Reply routes
router
  .route("/:id/reply")
  .post(isAuthenticated, authorizeRoles("ADMIN"), replyReview)
  .patch(isAuthenticated, authorizeRoles("ADMIN"), updateReplyReview)
  .delete(isAuthenticated, authorizeRoles("ADMIN"), deleteReplyReview);

export default router;
