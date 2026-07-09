import { env } from "../config/env.js";
import { decryptSecret, encryptSecret } from "./secrets.js";

const metaRequest = async (path, token, body) => {
  const response = await fetch(`https://graph.facebook.com/v23.0/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...body, access_token: token }),
  });
  const result = await response.json();
  if (!response.ok || result.error) throw new Error(result.error?.message || "Meta publishing failed");
  return result;
};

export const publishToFacebook = async (account, post) => {
  const token = decryptSecret(account.accessToken);
  const caption = `${post.caption}\n\n${post.hashtags.join(" ")}`.trim();
  if (post.format === "video") {
    if (!post.mediaUrl) throw new Error("Facebook video post requires a rendered media URL");
    return metaRequest(`${account.platformAccountId}/videos`, token, { file_url: post.mediaUrl, description: caption });
  }
  if (post.format === "image" && post.mediaUrl) {
    return metaRequest(`${account.platformAccountId}/photos`, token, { url: post.mediaUrl, caption });
  }
  return metaRequest(`${account.platformAccountId}/feed`, token, { message: caption, ...(post.mediaUrl ? { link: post.mediaUrl } : {}) });
};

const waitForInstagramContainer = async (containerId, token) => {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    const url = new URL(`https://graph.facebook.com/v23.0/${containerId}`);
    url.search = new URLSearchParams({ fields: "status_code", access_token: token }).toString();
    const response = await fetch(url);
    const result = await response.json();
    if (result.status_code === "FINISHED") return;
    if (result.status_code === "ERROR" || result.error) throw new Error(result.error?.message || "Instagram media processing failed");
    await new Promise((resolve) => setTimeout(resolve, 3_000));
  }
  throw new Error("Instagram media is still processing; retry publishing shortly");
};

export const publishToInstagram = async (account, post) => {
  if (!post.mediaUrl) throw new Error("Instagram requires an image or video URL");
  const token = decryptSecret(account.accessToken);
  const caption = `${post.caption}\n\n${post.hashtags.join(" ")}`.trim();
  const isVideo = post.format === "video";
  const container = await metaRequest(`${account.platformAccountId}/media`, token, isVideo
    ? { media_type: "REELS", video_url: post.mediaUrl, caption, share_to_feed: true }
    : { image_url: post.mediaUrl, caption });
  if (isVideo) await waitForInstagramContainer(container.id, token);
  return metaRequest(`${account.platformAccountId}/media_publish`, token, { creation_id: container.id });
};

const refreshTikTokToken = async (account) => {
  if (!account.tokenExpiresAt || account.tokenExpiresAt.getTime() > Date.now() + 5 * 60_000) return decryptSecret(account.accessToken);
  const refreshToken = decryptSecret(account.refreshToken);
  const response = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_key: env.tiktokClientKey,
      client_secret: env.tiktokClientSecret,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });
  const result = await response.json();
  if (!response.ok || result.error) throw new Error(result.error_description || "TikTok token refresh failed");
  account.accessToken = encryptSecret(result.access_token);
  account.refreshToken = encryptSecret(result.refresh_token || refreshToken);
  account.tokenExpiresAt = new Date(Date.now() + result.expires_in * 1000);
  await account.save();
  return result.access_token;
};

export const publishToTikTok = async (account, post) => {
  if (post.format !== "video" || !post.mediaUrl) throw new Error("TikTok direct publishing requires a rendered video URL");
  const token = await refreshTikTokToken(account);
  const response = await fetch("https://open.tiktokapis.com/v2/post/publish/video/init/", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify({
      post_info: {
        title: `${post.caption}\n\n${post.hashtags.join(" ")}`.slice(0, 2200),
        privacy_level: account.metadata?.privacyLevel || "SELF_ONLY",
        disable_duet: false,
        disable_comment: false,
        disable_stitch: false,
      },
      source_info: { source: "PULL_FROM_URL", video_url: `${env.backendPublicUrl}/api/media/video/${post.id}` },
    }),
  });
  const result = await response.json();
  if (!response.ok || result.error?.code) throw new Error(result.error?.message || "TikTok publishing failed");
  return { id: result.data?.publish_id || "" };
};

export const publishNatively = async (account, post) => {
  if (account.platform === "facebook") return publishToFacebook(account, post);
  if (account.platform === "instagram") return publishToInstagram(account, post);
  if (account.platform === "tiktok") return publishToTikTok(account, post);
  throw new Error(`Native publishing is not implemented for ${account.platform}`);
};
