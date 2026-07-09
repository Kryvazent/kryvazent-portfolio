import mongoose from "mongoose";

const looseOptions = { _id: false, strict: false };
const ContentSchema = new mongoose.Schema({
  key: { type: String, unique: true, required: true, default: "main" },
  pricing: { type: new mongoose.Schema({}, looseOptions), required: true },
  projects: { type: [new mongoose.Schema({}, looseOptions)], default: [] },
  testimonials: { type: [new mongoose.Schema({}, looseOptions)], default: [] },
  partners: { type: [new mongoose.Schema({}, looseOptions)], default: [] },
}, { timestamps: true, minimize: false });

export const Content = mongoose.model("Content", ContentSchema);
