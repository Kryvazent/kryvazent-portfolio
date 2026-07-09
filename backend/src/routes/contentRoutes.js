import { Router } from "express";
import { getAdminContent, getPublicContent, updateContent } from "../controllers/contentController.js";
import { authenticate, requireTeams } from "../middleware/authenticate.js";

export const contentRouter = Router();
contentRouter.get("/content", getPublicContent);
contentRouter.get("/admin/content", authenticate, requireTeams("maintenance"), getAdminContent);
contentRouter.put("/admin/content", authenticate, requireTeams("maintenance"), updateContent);
