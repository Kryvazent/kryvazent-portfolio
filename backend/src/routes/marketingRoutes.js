import { Router } from "express";
import { checkVideo, createAccount, createCampaign, deleteAccount, deleteCampaign, deletePost, generateCampaign, getMarketingDashboard, renderVideo, runPublisher, updateAccount, updateCampaign, updatePost } from "../controllers/marketingController.js";
import { authenticate, requireTeams } from "../middleware/authenticate.js";

export const marketingRouter = Router();
marketingRouter.use(authenticate, requireTeams("marketing"));
marketingRouter.get("/", getMarketingDashboard);
marketingRouter.post("/accounts", createAccount);
marketingRouter.patch("/accounts/:id", updateAccount);
marketingRouter.delete("/accounts/:id", deleteAccount);
marketingRouter.post("/campaigns", createCampaign);
marketingRouter.patch("/campaigns/:id", updateCampaign);
marketingRouter.delete("/campaigns/:id", deleteCampaign);
marketingRouter.post("/campaigns/:id/generate", generateCampaign);
marketingRouter.patch("/posts/:id", updatePost);
marketingRouter.delete("/posts/:id", deletePost);
marketingRouter.post("/posts/:id/render-video", renderVideo);
marketingRouter.get("/posts/:id/video-status", checkVideo);
marketingRouter.post("/publish-due", runPublisher);
