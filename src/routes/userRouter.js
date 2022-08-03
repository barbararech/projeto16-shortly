import { Router } from "express";
import { getUser, getRanking } from "../controllers/userController.js";
import { tokenValidationMiddleware } from "../middlewares/tokenValidationMiddleware.js";

const router = Router();

router.get("/users/me", tokenValidationMiddleware, getUser);
router.get("/ranking", getRanking);

export default router;
