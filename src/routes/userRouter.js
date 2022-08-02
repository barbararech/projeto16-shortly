import { Router } from "express";
import { getUser } from "../controllers/userController.js";
import { tokenValidationMiddleware } from "../middlewares/tokenValidationMiddleware.js";

const router = Router();

router.get("/users/me", tokenValidationMiddleware, getUser);

export default router;
