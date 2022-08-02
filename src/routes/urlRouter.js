import { Router } from "express";
import { addURL } from "../controllers/urlController.js";
import { tokenValidationMiddleware } from "../middlewares/tokenValidationMiddleware.js";
import { ValidateURL } from "../middlewares/urlSchemaValidationMiddleware.js";

const router = Router();

router.post("/urls/shorten", tokenValidationMiddleware, ValidateURL, addURL);

export default router;
