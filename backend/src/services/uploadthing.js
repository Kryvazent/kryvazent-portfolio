import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import { createUploadthing, UTFiles } from "uploadthing/express";
import { UTApi, UploadThingError } from "uploadthing/server";
import { env } from "../config/env.js";
import { User } from "../models/User.js";

const f = createUploadthing();
export const utapi = new UTApi({ token: env.uploadThingToken });

const authenticateUpload = async (request) => {
  const token = request.headers.authorization?.replace(/^Bearer\s+/i, "");
  if (!token) throw new UploadThingError("Authentication required");
  try {
    const payload = jwt.verify(token, env.jwtSecret);
    const user = await User.findById(payload.sub);
    if (!user || !user.active) throw new Error("Account unavailable");
    return user;
  } catch {
    throw new UploadThingError("Session expired or invalid");
  }
};

const requireUploadTeam = (user, teams) => {
  if (user.role === "admin" || user.team === "administrative" || teams.includes(user.team)) return;
  throw new UploadThingError("Your team does not have access to this upload area");
};

const uploadMiddleware = (category, teams) => async ({ req, files }) => {
  if (!env.uploadThingToken) throw new UploadThingError("UploadThing is not configured");
  const user = await authenticateUpload(req);
  requireUploadTeam(user, teams);
  return {
    userId: user.id,
    category,
    [UTFiles]: files.map((file) => ({
      ...file,
      customId: `${category}/${user.id}/${crypto.randomUUID()}-${file.name.replace(/[^\w.-]+/g, "-")}`,
    })),
  };
};

const uploadComplete = ({ metadata, file }) => ({
  uploadedBy: metadata.userId,
  category: metadata.category,
  key: file.key,
  customId: file.customId,
  url: file.ufsUrl || file.url,
});

export const uploadRouter = {
  projectImage: f({ image: { maxFileSize: "8MB", maxFileCount: 1 } })
    .middleware(uploadMiddleware("project-images", ["maintenance"]))
    .onUploadComplete(uploadComplete),
  partnerLogo: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(uploadMiddleware("partner-logos", ["maintenance"]))
    .onUploadComplete(uploadComplete),
  marketingMedia: f({
    image: { maxFileSize: "8MB", maxFileCount: 1 },
    video: { maxFileSize: "128MB", maxFileCount: 1 },
  })
    .middleware(uploadMiddleware("marketing-media", ["marketing"]))
    .onUploadComplete(uploadComplete),
  clientProjectFile: f({ blob: { maxFileSize: "32MB", maxFileCount: 1 } })
    .middleware(uploadMiddleware("client-project-files", ["project_management"]))
    .onUploadComplete(uploadComplete),
};

export const extractUploadThingKey = (value = "") => {
  try {
    const url = new URL(value);
    const parts = url.pathname.split("/").filter(Boolean);
    const fIndex = parts.findIndex((part) => part === "f");
    if (fIndex >= 0 && parts[fIndex + 1]) return parts[fIndex + 1];
    if (url.hostname.includes("ufs.sh") && parts[0]) return parts.at(-1);
    if (url.hostname.includes("uploadthing") && parts.at(-1)) return parts.at(-1);
  } catch {
    return value && !value.includes("/") ? value : "";
  }
  return "";
};
