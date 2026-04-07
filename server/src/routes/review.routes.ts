import { Express, Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { createReviews } from "../controllers/reviews.controller";

const router = Router();

router.route("/:id").post(isAuthenticated, createReviews);

export default router;
