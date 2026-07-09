import { Router } from "express";
import { getAdminContent, getPublicContent, updateContent } from "../controllers/contentController.js";
import { authenticate } from "../middleware/authenticate.js";

export const contentRouter = Router();
contentRouter.get("/content", getPublicContent);
contentRouter.get("/admin/content", authenticate, getAdminContent);
contentRouter.put("/admin/content", authenticate, updateContent);
