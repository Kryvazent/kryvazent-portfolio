import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { SocialAccount } from "../models/SocialAccount.js";
import { MarketingPost } from "../models/MarketingPost.js";
import { encryptSecret } from "../services/secrets.js";

const frontendUrl = () => env.frontendOrigins.find((origin) => !origin.includes("localhost")) || env.frontendOrigins[0];
const callbackUrl = (platform) => `${env.backendPublicUrl}/api/oauth/${platform}/callback`;
const stateFor = (platform, userId) => jwt.sign({ platform, userId, purpose: "social-oauth" }, env.jwtSecret, { expiresIn: "10m" });
const verifyState = (state, platform) => {
  const payload = jwt.verify(state, env.jwtSecret);
  if (payload.platform !== platform || payload.purpose !== "social-oauth") throw new Error("Invalid OAuth state");
  return payload;
};
const redirectResult = (response, platform, status, message = "") => {
  const url = new URL("/admin/marketing/", `${frontendUrl()}/`);
  url.searchParams.set("social", platform);
  url.searchParams.set("status", status);
  if (message) url.searchParams.set("message", message.slice(0, 160));
  response.redirect(url.toString());
};

export const startSocialOAuth = async (request, response) => {
  const { platform } = request.params;
  const state = stateFor(platform, request.user.id);
  if (platform === "meta") {
    if (!env.metaAppId || !env.metaAppSecret) return response.status(503).json({ message: "Meta credentials are not configured" });
    const url = new URL("https://www.facebook.com/v23.0/dialog/oauth");
    url.search = new URLSearchParams({
      client_id: env.metaAppId,
      redirect_uri: callbackUrl("meta"),
      state,
      response_type: "code",
      scope: "pages_show_list,pages_read_engagement,pages_manage_posts,instagram_basic,instagram_content_publish",
    }).toString();
    return response.json({ url: url.toString() });
  }
  if (platform === "tiktok") {
    if (!env.tiktokClientKey || !env.tiktokClientSecret) return response.status(503).json({ message: "TikTok credentials are not configured" });
    const url = new URL("https://www.tiktok.com/v2/auth/authorize/");
    url.search = new URLSearchParams({
      client_key: env.tiktokClientKey,
      redirect_uri: callbackUrl("tiktok"),
      response_type: "code",
      scope: "user.info.basic,video.publish",
      state,
    }).toString();
    return response.json({ url: url.toString() });
  }
  response.status(400).json({ message: "Unsupported social OAuth provider" });
};

export const metaCallback = async (request, response) => {
  try {
    verifyState(request.query.state, "meta");
    if (request.query.error) throw new Error(request.query.error_description || request.query.error);
    const tokenUrl = new URL("https://graph.facebook.com/v23.0/oauth/access_token");
    tokenUrl.search = new URLSearchParams({
      client_id: env.metaAppId,
      client_secret: env.metaAppSecret,
      redirect_uri: callbackUrl("meta"),
      code: request.query.code,
    }).toString();
    const shortResponse = await fetch(tokenUrl);
    const shortToken = await shortResponse.json();
    if (!shortResponse.ok) throw new Error(shortToken.error?.message || "Meta token exchange failed");

    const longUrl = new URL("https://graph.facebook.com/v23.0/oauth/access_token");
    longUrl.search = new URLSearchParams({
      grant_type: "fb_exchange_token",
      client_id: env.metaAppId,
      client_secret: env.metaAppSecret,
      fb_exchange_token: shortToken.access_token,
    }).toString();
    const longResponse = await fetch(longUrl);
    const longToken = await longResponse.json();
    if (!longResponse.ok) throw new Error(longToken.error?.message || "Meta long-lived token exchange failed");

    const pagesUrl = new URL("https://graph.facebook.com/v23.0/me/accounts");
    pagesUrl.search = new URLSearchParams({
      fields: "id,name,access_token,instagram_business_account{id,username}",
      access_token: longToken.access_token,
    }).toString();
    const pagesResponse = await fetch(pagesUrl);
    const pages = await pagesResponse.json();
    if (!pagesResponse.ok) throw new Error(pages.error?.message || "Unable to retrieve Facebook Pages");
    const page = pages.data?.find((item) => item.id === env.metaFacebookPageId);
    if (!page) throw new Error("Configured Facebook Page was not returned for this account");
    const expiresAt = longToken.expires_in ? new Date(Date.now() + longToken.expires_in * 1000) : null;

    await SocialAccount.findOneAndUpdate(
      { platform: "facebook", platformAccountId: page.id },
      {
        platform: "facebook", accountName: page.name, handle: page.name, platformAccountId: page.id,
        accessToken: encryptSecret(page.access_token), tokenExpiresAt: expiresAt, connectionType: "oauth", active: true,
      },
      { upsert: true, new: true },
    );
    const instagram = page.instagram_business_account;
    if (instagram && (!env.metaInstagramAccountId || instagram.id === env.metaInstagramAccountId)) {
      await SocialAccount.findOneAndUpdate(
        { platform: "instagram", platformAccountId: instagram.id },
        {
          platform: "instagram", accountName: instagram.username || "Instagram", handle: instagram.username || "",
          platformAccountId: instagram.id, accessToken: encryptSecret(page.access_token), tokenExpiresAt: expiresAt,
          connectionType: "oauth", active: true, metadata: { facebookPageId: page.id },
        },
        { upsert: true, new: true },
      );
    }
    redirectResult(response, "meta", "connected");
  } catch (error) {
    redirectResult(response, "meta", "error", error instanceof Error ? error.message : "Meta connection failed");
  }
};

export const tiktokCallback = async (request, response) => {
  try {
    verifyState(request.query.state, "tiktok");
    if (request.query.error) throw new Error(request.query.error_description || request.query.error);
    const tokenResponse = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_key: env.tiktokClientKey,
        client_secret: env.tiktokClientSecret,
        code: request.query.code,
        grant_type: "authorization_code",
        redirect_uri: callbackUrl("tiktok"),
      }),
    });
    const token = await tokenResponse.json();
    if (!tokenResponse.ok || token.error) throw new Error(token.error_description || token.message || "TikTok token exchange failed");
    const userResponse = await fetch("https://open.tiktokapis.com/v2/user/info/?fields=open_id,display_name,avatar_url", {
      headers: { Authorization: `Bearer ${token.access_token}` },
    });
    const userResult = await userResponse.json();
    const user = userResult.data?.user || {};
    await SocialAccount.findOneAndUpdate(
      { platform: "tiktok", platformAccountId: token.open_id },
      {
        platform: "tiktok", accountName: user.display_name || "TikTok", handle: user.display_name || "",
        platformAccountId: token.open_id, accessToken: encryptSecret(token.access_token),
        refreshToken: encryptSecret(token.refresh_token), tokenExpiresAt: new Date(Date.now() + token.expires_in * 1000),
        connectionType: "oauth", active: true, metadata: { avatarUrl: user.avatar_url || "" },
      },
      { upsert: true, new: true },
    );
    redirectResult(response, "tiktok", "connected");
  } catch (error) {
    redirectResult(response, "tiktok", "error", error instanceof Error ? error.message : "TikTok connection failed");
  }
};

export const serveMarketingVideo = async (request, response) => {
  const post = await MarketingPost.findById(request.params.postId).select("mediaUrl videoStatus");
  if (!post?.mediaUrl || post.videoStatus !== "ready") return response.status(404).json({ message: "Video not found" });
  const range = request.headers.range;
  const upstream = await fetch(post.mediaUrl, { headers: range ? { Range: range } : {} });
  if (!upstream.ok) return response.status(502).json({ message: "Rendered video is unavailable" });
  response.status(upstream.status);
  response.set("Content-Type", upstream.headers.get("content-type") || "video/mp4");
  const contentLength = upstream.headers.get("content-length");
  if (contentLength) response.set("Content-Length", contentLength);
  const contentRange = upstream.headers.get("content-range");
  if (contentRange) response.set("Content-Range", contentRange);
  response.set("Accept-Ranges", upstream.headers.get("accept-ranges") || "bytes");
  response.set("Cache-Control", "public, max-age=86400");
  response.send(Buffer.from(await upstream.arrayBuffer()));
};
