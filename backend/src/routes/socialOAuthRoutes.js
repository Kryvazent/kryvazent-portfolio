import { Router } from "express";
import { metaCallback, serveMarketingVideo, startSocialOAuth, tiktokCallback } from "../controllers/socialOAuthController.js";
import { authenticate } from "../middleware/authenticate.js";

export const socialOAuthRouter = Router();
socialOAuthRouter.get("/admin/social/oauth/:platform/start", authenticate, startSocialOAuth);
socialOAuthRouter.get("/oauth/meta/callback", metaCallback);
socialOAuthRouter.get("/oauth/tiktok/callback", tiktokCallback);
socialOAuthRouter.get("/media/video/:postId", serveMarketingVideo);
