import { MarketingCampaign } from "../models/MarketingCampaign.js";
import { MarketingPost } from "../models/MarketingPost.js";
import { SocialAccount } from "../models/SocialAccount.js";
import { generateMarketingPackage } from "../services/marketingGenerator.js";
import { processScheduledPosts } from "../services/publisher.js";
import { refreshVideo, submitVideo } from "../services/videoRenderer.js";
import { getQuotaStates } from "../services/quotaGuard.js";
import { encryptSecret } from "../services/secrets.js";

export const getMarketingDashboard = async (_request, response) => {
  const [accounts, campaigns, posts, quotas] = await Promise.all([
    SocialAccount.find().sort({ createdAt: -1 }),
    MarketingCampaign.find().sort({ createdAt: -1 }),
    MarketingPost.find().populate("campaign", "name").sort({ createdAt: -1 }).limit(100),
    getQuotaStates(),
  ]);
  response.json({ accounts, campaigns, posts, quotas });
};
export const createAccount = async (request, response) => {
  const account = await SocialAccount.create({ ...request.body, accessToken: encryptSecret(request.body.accessToken) });
  const safeAccount = account.toObject();
  delete safeAccount.accessToken;
  response.status(201).json(safeAccount);
};
export const updateAccount = async (request, response) => {
  const changes = { ...request.body };
  if (changes.accessToken) changes.accessToken = encryptSecret(changes.accessToken);
  else delete changes.accessToken;
  response.json(await SocialAccount.findByIdAndUpdate(request.params.id, changes, { new: true, runValidators: true }));
};
export const deleteAccount = async (request, response) => { await SocialAccount.findByIdAndDelete(request.params.id); response.status(204).end(); };
export const createCampaign = async (request, response) => response.status(201).json(await MarketingCampaign.create({ ...request.body, createdBy: request.user._id }));
export const updateCampaign = async (request, response) => response.json(await MarketingCampaign.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true }));
export const deleteCampaign = async (request, response) => {
  await Promise.all([MarketingCampaign.findByIdAndDelete(request.params.id), MarketingPost.deleteMany({ campaign: request.params.id })]);
  response.status(204).end();
};
export const generateCampaign = async (request, response) => {
  const campaign = await MarketingCampaign.findById(request.params.id);
  if (!campaign) return response.status(404).json({ message: "Campaign not found" });
  const generated = await generateMarketingPackage(campaign);
  campaign.strategy = generated.strategy;
  await campaign.save();
  await MarketingPost.deleteMany({ campaign: campaign._id, status: "draft" });
  const posts = await MarketingPost.insertMany(generated.posts.map((post) => ({
    ...post,
    campaign: campaign._id,
    videoStatus: post.format === "video" ? "brief_ready" : "not_requested",
  })));
  response.json({ campaign, posts, provider: generated.provider });
};
export const updatePost = async (request, response) => response.json(await MarketingPost.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true }));
export const deletePost = async (request, response) => { await MarketingPost.findByIdAndDelete(request.params.id); response.status(204).end(); };
export const runPublisher = async (_request, response) => { await processScheduledPosts(); response.json({ message: "Publishing queue processed" }); };
export const renderVideo = async (request, response) => {
  const post = await MarketingPost.findById(request.params.id);
  if (!post) return response.status(404).json({ message: "Post not found" });
  response.json(await submitVideo(post));
};
export const checkVideo = async (request, response) => {
  const post = await MarketingPost.findById(request.params.id);
  if (!post) return response.status(404).json({ message: "Post not found" });
  response.json(await refreshVideo(post));
};
