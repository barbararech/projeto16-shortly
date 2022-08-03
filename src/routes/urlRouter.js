import { Router } from "express";
import {
  addURL,
  getURL,
  openURL,
  deleteURL,
} from "../controllers/urlController.js";
import { tokenValidationMiddleware } from "../middlewares/tokenValidationMiddleware.js";
import { ValidateURL } from "../middlewares/urlSchemaValidationMiddleware.js";

const router = Router();

router.post("/urls/shorten", tokenValidationMiddleware, ValidateURL, addURL);
router.get("/urls/:id", getURL);
router.get("/urls/open/:shortUrl", openURL);
router.delete("/urls/:id", tokenValidationMiddleware, deleteURL);

export default router;
