import bcrypt from "bcryptjs";
import { env } from "../config/env.js";
import { defaultContent } from "../data/defaultContent.js";
import { Content } from "../models/Content.js";
import { User } from "../models/User.js";

export const bootstrapData = async () => {
  const admin = await User.findOne({ email: env.adminEmail });
  if (!admin) {
    await User.create({ name: "Kryvazent Administrator", email: env.adminEmail, passwordHash: await bcrypt.hash(env.adminPassword, 12), role: "admin", active: true });
  } else {
    const updates = { role: "admin" };
    if (!admin.name) updates.name = "Kryvazent Administrator";
    if (admin.active === undefined) updates.active = true;
    await User.updateOne({ _id: admin._id }, { $set: updates });
  }
  await Content.findOneAndUpdate({ key: "main" }, { $setOnInsert: { key: "main", ...defaultContent } }, { upsert: true });
};
