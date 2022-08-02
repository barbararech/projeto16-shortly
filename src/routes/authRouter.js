import { Router } from "express";
import { signIn, signUp } from "../controllers/authController.js";
import { ValidateSignUp, ValidateSignIn } from "../middlewares/authSchemaValidationMiddleware.js";

const router = Router();

router.post("/signup", ValidateSignUp, signUp);
router.post("/signin", ValidateSignIn, signIn);

export default router;
