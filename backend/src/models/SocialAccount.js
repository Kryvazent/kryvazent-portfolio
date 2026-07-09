import mongoose from "mongoose";

const SocialAccountSchema = new mongoose.Schema({
  platform: { type: String, enum: ["instagram", "facebook", "linkedin", "tiktok", "youtube", "x", "other"], required: true },
  accountName: { type: String, required: true, trim: true },
  handle: { type: String, trim: true, default: "" },
  publishingWebhook: { type: String, trim: true, default: "" },
  accessToken: { type: String, select: false, default: "" },
  active: { type: Boolean, default: true },
  connectedAt: { type: Date, default: Date.now },
  lastPublishedAt: { type: Date, default: null },
}, { timestamps: true });

export const SocialAccount = mongoose.model("SocialAccount", SocialAccountSchema);
