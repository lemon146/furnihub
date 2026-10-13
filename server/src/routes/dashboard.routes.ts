import { Router } from "express";
import { getStats } from "../controllers/dashboard.controller";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = Router();

router.get("/", isAuthenticated, authorizeRoles("ADMIN"), getStats);

export default router;
