import { Router } from "express";
import {
  addURL,
  getURL,
  openURL,
  deleteURL,
} from "../controllers/urlController.js";
import { tokenValidationMiddleware } from "../middlewares/tokenValidationMiddleware.js";
import { middleware } from "../middlewares/schemasValidationMiddleware.js";
import { schemas } from "../schemas/schemas.js";

const router = Router();

router.post(
  "/urls/shorten",
  tokenValidationMiddleware,
  middleware(schemas.urlSchema),
  addURL
);
router.get("/urls/:id", getURL);
router.get("/urls/open/:shortUrl", openURL);
router.delete("/urls/:id", tokenValidationMiddleware, deleteURL);

export default router;
