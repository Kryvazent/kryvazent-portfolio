import { defaultContent } from "../data/defaultContent.js";
import { Content } from "../models/Content.js";

export const getPublicContent = async (_request, response) => {
  const source = await Content.findOne({ key: "main" }).lean() || defaultContent;
  response.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  response.json({ ...source, projects: source.projects.filter((item) => item.published !== false), testimonials: source.testimonials.filter((item) => item.published !== false), partners: source.partners.filter((item) => item.published !== false) });
};
export const getAdminContent = async (_request, response) => response.json(await Content.findOne({ key: "main" }).lean() || defaultContent);
export const updateContent = async (request, response) => {
  const { pricing, projects, testimonials, partners } = request.body || {};
  if (!pricing || !Array.isArray(projects) || !Array.isArray(testimonials) || !Array.isArray(partners)) return response.status(400).json({ message: "Invalid content payload" });
  response.json(await Content.findOneAndUpdate({ key: "main" }, { key: "main", pricing, projects, testimonials, partners }, { new: true, upsert: true, runValidators: true }).lean());
};
