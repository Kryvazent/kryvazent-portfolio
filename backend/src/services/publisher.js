import { MarketingPost } from "../models/MarketingPost.js";
import { SocialAccount } from "../models/SocialAccount.js";
import { decryptSecret } from "./secrets.js";
import { refreshProcessingVideos } from "./videoRenderer.js";

let timer;

const publishPost = async (post) => {
  const account = await SocialAccount.findOne({ platform: post.platform, active: true }).select("+accessToken");
  if (!account?.publishingWebhook) {
    post.status = "failed";
    post.failureReason = `No active ${post.platform} publishing connector`;
    return post.save();
  }
  post.status = "publishing";
  await post.save();
  const accessToken = decryptSecret(account.accessToken);
  const response = await fetch(account.publishingWebhook, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}) },
    body: JSON.stringify({ postId: post.id, platform: post.platform, format: post.format, caption: post.caption, hashtags: post.hashtags, mediaUrl: post.mediaUrl }),
  });
  if (!response.ok) throw new Error(`Publishing connector returned ${response.status}`);
  const result = await response.json().catch(() => ({}));
  post.status = "published";
  post.publishedAt = new Date();
  post.externalPostId = result.id || result.postId || "";
  post.failureReason = "";
  account.lastPublishedAt = new Date();
  await Promise.all([post.save(), account.save()]);
};

export const processScheduledPosts = async () => {
  const posts = await MarketingPost.find({ status: "scheduled", scheduledAt: { $lte: new Date() } }).limit(10);
  for (const post of posts) {
    try { await publishPost(post); } catch (error) {
      post.status = "failed";
      post.failureReason = error instanceof Error ? error.message : "Publishing failed";
      await post.save();
    }
  }
};

export const startPublisher = () => {
  if (timer) return;
  timer = setInterval(() => {
    void processScheduledPosts();
    void refreshProcessingVideos();
  }, 30_000);
  timer.unref();
};
