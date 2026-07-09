import mongoose from "mongoose";

const MarketingCampaignSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  goal: { type: String, required: true, trim: true },
  audience: { type: String, required: true, trim: true },
  offer: { type: String, trim: true, default: "" },
  tone: { type: String, trim: true, default: "credible, clear, and helpful" },
  platforms: [{ type: String }],
  postsPerWeek: { type: Number, min: 1, max: 21, default: 3 },
  status: { type: String, enum: ["draft", "active", "paused", "completed"], default: "draft" },
  strategy: {
    summary: { type: String, default: "" },
    pillars: [{ type: String }],
    callsToAction: [{ type: String }],
    videoThemes: [{ type: String }],
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

export const MarketingCampaign = mongoose.model("MarketingCampaign", MarketingCampaignSchema);
