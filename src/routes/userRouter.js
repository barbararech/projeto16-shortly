import { Router } from "express";
import { signIn, signUp } from "../controllers/userController.js";
import { ValidateSignUp } from "../middlewares/userSchemaValidationMiddleware.js";
import { ValidateSignIn} from "../middlewares/userSchemaValidationMiddleware.js";

const router = Router();

// router.post("/signin", ValidateSignIn, signIn);
router.post("/signup", ValidateSignUp, signUp);

export default router;
