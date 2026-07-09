import mongoose from "mongoose";

const MarketingPostSchema = new mongoose.Schema({
  campaign: { type: mongoose.Schema.Types.ObjectId, ref: "MarketingCampaign", required: true, index: true },
  platform: { type: String, required: true },
  format: { type: String, enum: ["text", "image", "carousel", "video"], default: "text" },
  title: { type: String, required: true },
  caption: { type: String, required: true },
  hashtags: [{ type: String }],
  creativeBrief: { type: String, default: "" },
  videoScript: { type: String, default: "" },
  mediaUrl: { type: String, default: "" },
  videoStatus: { type: String, enum: ["not_requested", "brief_ready", "processing", "ready", "failed"], default: "not_requested" },
  videoProjectId: { type: String, default: "" },
  status: { type: String, enum: ["draft", "approved", "scheduled", "publishing", "published", "failed"], default: "draft", index: true },
  scheduledAt: { type: Date, default: null, index: true },
  publishedAt: { type: Date, default: null },
  externalPostId: { type: String, default: "" },
  failureReason: { type: String, default: "" },
}, { timestamps: true });

export const MarketingPost = mongoose.model("MarketingPost", MarketingPostSchema);
