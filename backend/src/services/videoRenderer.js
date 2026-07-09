import { env } from "../config/env.js";
import { MarketingPost } from "../models/MarketingPost.js";
import { blockQuota, reserveQuota } from "./quotaGuard.js";

const headers = () => ({ "Content-Type": "application/json", "x-api-key": env.json2VideoApiKey });

export const submitVideo = async (post) => {
  if (!env.json2VideoApiKey) throw new Error("JSON2VIDEO_API_KEY is not configured");
  const lines = (post.videoScript || post.caption).split("\n").map((line) => line.replace(/^[A-Z ]+:\s*/, "").trim()).filter(Boolean).slice(0, 6);
  const estimatedCredits = Math.max(4, lines.length * 4);
  await reserveQuota("json2video", estimatedCredits);
  const response = await fetch("https://api.json2video.com/v2/movies", {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      resolution: "instagram-story",
      quality: "high",
      comment: post.title,
      "client-data": { postId: post.id },
      scenes: lines.map((text) => ({ duration: 4, elements: [{ type: "text", text, style: "001" }] })),
    }),
  });
  const result = await response.json();
  if ([400, 401, 402].includes(response.status) && /quota|credit/i.test(result.message || "")) {
    await blockQuota("json2video", result.message || "Json2Video credits exhausted");
  }
  if (!response.ok || !result.project) throw new Error(result.message || "Json2Video render submission failed");
  post.videoProjectId = result.project;
  post.videoStatus = "processing";
  post.failureReason = "";
  await post.save();
  return post;
};

export const refreshVideo = async (post) => {
  if (!post.videoProjectId) throw new Error("This post has no video render job");
  const response = await fetch(`https://api.json2video.com/v2/movies?project=${encodeURIComponent(post.videoProjectId)}`, { headers: headers() });
  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Unable to retrieve video status");
  if (result.movie?.status === "done") {
    post.videoStatus = "ready";
    post.mediaUrl = result.movie.url;
  } else if (["error", "timeout"].includes(result.movie?.status)) {
    post.videoStatus = "failed";
    post.failureReason = result.movie?.message || "Video rendering failed";
  } else {
    post.videoStatus = "processing";
  }
  await post.save();
  return post;
};

export const refreshProcessingVideos = async () => {
  if (!env.json2VideoApiKey) return;
  const posts = await MarketingPost.find({ videoStatus: "processing", videoProjectId: { $ne: "" } }).limit(10);
  for (const post of posts) {
    try { await refreshVideo(post); } catch (error) {
      post.failureReason = error instanceof Error ? error.message : "Video status check failed";
      await post.save();
    }
  }
};
