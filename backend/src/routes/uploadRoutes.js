import { Router } from "express";
import { createRouteHandler } from "uploadthing/express";
import { deleteUpload } from "../controllers/uploadController.js";
import { authenticate, requireTeams } from "../middleware/authenticate.js";
import { uploadRouter } from "../services/uploadthing.js";

export const uploadAdminRouter = Router();
uploadAdminRouter.delete("/", authenticate, requireTeams("maintenance", "marketing", "project_management"), deleteUpload);

export const uploadThingRouter = createRouteHandler({ router: uploadRouter });
