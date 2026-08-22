import bcrypt from "bcryptjs";
import { env } from "../config/env.js";
import { defaultContent } from "../data/defaultContent.js";
import { Content } from "../models/Content.js";
import { SocialAccount } from "../models/SocialAccount.js";
import { User } from "../models/User.js";
import { encryptSecret } from "./secrets.js";

export const bootstrapData = async () => {
  const admin = await User.findOne({ email: env.adminEmail });
  if (!admin) {
    await User.create({ name: "Kryvazent Administrator", email: env.adminEmail, passwordHash: await bcrypt.hash(env.adminPassword, 12), role: "admin", team: "administrative", active: true });
  } else {
    const updates = { role: "admin", team: "administrative" };
    if (!admin.name) updates.name = "Kryvazent Administrator";
    if (admin.active === undefined) updates.active = true;
    await User.updateOne({ _id: admin._id }, { $set: updates });
  }
  await Content.findOneAndUpdate({ key: "main" }, { $setOnInsert: { key: "main", ...defaultContent } }, { upsert: true });

  // Patch: update Rajapura Herbal project image if it still has the old Unsplash placeholder
  await Content.updateOne(
    { key: "main", "projects.title": "Rajapura Herbal", "projects.image": { $regex: "unsplash" } },
    { $set: { "projects.$.image": "/partners/rajapura-bg.png" } }
  );

  if (env.metaPageAccessToken && env.metaFacebookPageId) {
    const encryptedPageToken = encryptSecret(env.metaPageAccessToken);
    await SocialAccount.findOneAndUpdate(
      { platform: "facebook", platformAccountId: env.metaFacebookPageId },
      {
        platform: "facebook",
        accountName: "Facebook Page",
        handle: env.metaFacebookPageId,
        platformAccountId: env.metaFacebookPageId,
        accessToken: encryptedPageToken,
        tokenExpiresAt: null,
        connectionType: "oauth",
        active: true,
        metadata: { configuredFromEnv: true },
      },
      { upsert: true, new: true },
    );
    if (env.metaInstagramAccountId) {
      await SocialAccount.findOneAndUpdate(
        { platform: "instagram", platformAccountId: env.metaInstagramAccountId },
        {
          platform: "instagram",
          accountName: "Instagram Professional Account",
          handle: env.metaInstagramAccountId,
          platformAccountId: env.metaInstagramAccountId,
          accessToken: encryptedPageToken,
          tokenExpiresAt: null,
          connectionType: "oauth",
          active: true,
          metadata: { facebookPageId: env.metaFacebookPageId, configuredFromEnv: true },
        },
        { upsert: true, new: true },
      );
    }
  }
};
