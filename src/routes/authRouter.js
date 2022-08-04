import { Router } from "express";
import { signIn, signUp } from "../controllers/authController.js";
import { middleware } from "../middlewares/schemasValidationMiddleware.js";
import { schemas } from "../schemas/schemas.js";

const router = Router();

router.post("/signup", middleware(schemas.signUpSchema), signUp);
router.post("/signin", middleware(schemas.signInSchema), signIn);

export default router;
