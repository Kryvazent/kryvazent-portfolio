import mongoose from "mongoose";

const UsageQuotaSchema = new mongoose.Schema({
  provider: { type: String, enum: ["gemini", "json2video"], unique: true, required: true },
  periodKey: { type: String, required: true },
  used: { type: Number, default: 0 },
  limit: { type: Number, required: true },
  unit: { type: String, required: true },
  blockedUntil: { type: Date, default: null },
  hardBlocked: { type: Boolean, default: false },
  reason: { type: String, default: "" },
}, { timestamps: true });

export const UsageQuota = mongoose.model("UsageQuota", UsageQuotaSchema);
