export const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000").replace(/\/$/, "");

export type UploadEndpoint = "projectImage" | "partnerLogo" | "marketingMedia" | "clientProjectFile";

type UploadOptions = {
  files: File[];
  headers?: HeadersInit;
  onUploadProgress?: (event: { file?: File; progress: number; loaded?: number; delta?: number; totalLoaded?: number; totalProgress?: number }) => void;
};

const assertBackendReachable = async () => {
  try {
    const response = await fetch(`${API_URL}/api/health`, { cache: "no-store" });
    if (!response.ok) throw new Error(`Backend returned ${response.status}`);
  } catch {
    throw new Error(`Backend API is not reachable at ${API_URL}. Start the backend server or update NEXT_PUBLIC_API_URL.`);
  }
};

export const uploadFiles = async (endpoint: UploadEndpoint, options: UploadOptions) => {
  await assertBackendReachable();
  const { genUploader } = await import("uploadthing/client");
  const uploader = genUploader<any>({ url: `${API_URL}/api/uploadthing` });
  return uploader.uploadFiles(endpoint, options);
};

export const deleteUploadedFile = async (token: string, url: string) => {
  if (!url || !isUploadThingUrl(url)) return;
  await fetch(`${API_URL}/api/admin/uploads`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ url }),
  });
};

export const isUploadThingUrl = (url: string) => {
  try {
    const parsed = new URL(url);
    return parsed.hostname.includes("ufs.sh") || parsed.hostname.includes("uploadthing");
  } catch {
    return false;
  }
};
