import { utapi, extractUploadThingKey } from "../services/uploadthing.js";

export const deleteUpload = async (request, response) => {
  const key = request.body?.fileKey || extractUploadThingKey(request.body?.url || "");
  if (!key) return response.status(400).json({ message: "A UploadThing file key or URL is required" });
  await utapi.deleteFiles([key]);
  response.json({ deleted: true, key });
};
