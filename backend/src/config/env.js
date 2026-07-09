const requiredNames = ["MONGODB_URI", "JWT_SECRET", "ADMIN_EMAIL", "ADMIN_PASSWORD"];
const missingNames = requiredNames.filter((name) => !process.env[name]);
if (missingNames.length) throw new Error(`Missing environment variables: ${missingNames.join(", ")}`);

export const env = {
  port: Number(process.env.PORT || 4000),
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  adminEmail: process.env.ADMIN_EMAIL.toLowerCase().trim(),
  adminPassword: process.env.ADMIN_PASSWORD,
  frontendOrigins: (process.env.FRONTEND_URL || "http://localhost:3000,http://localhost:3001").split(",").map((origin) => origin.trim().replace(/\/$/, "")).filter(Boolean),
  nodeEnv: process.env.NODE_ENV || "development",
  geminiApiKey: process.env.GEMINI_API_KEY || "",
  geminiModel: process.env.GEMINI_MODEL || "gemini-3.5-flash",
  json2VideoApiKey: process.env.JSON2VIDEO_API_KEY || "",
  geminiDailyRequestLimit: Number(process.env.GEMINI_DAILY_REQUEST_LIMIT || 20),
  json2VideoCreditLimit: Number(process.env.JSON2VIDEO_TOTAL_CREDIT_LIMIT || 600),
  backendPublicUrl: (process.env.BACKEND_PUBLIC_URL || `http://localhost:${process.env.PORT || 4000}`).replace(/\/$/, ""),
  metaAppId: process.env.META_APP_ID || "",
  metaAppSecret: process.env.META_APP_SECRET || "",
  metaFacebookPageId: process.env.META_FACEBOOK_PAGE_ID || "",
  metaInstagramAccountId: process.env.META_INSTAGRAM_ACCOUNT_ID || "",
  tiktokClientKey: process.env.TIKTOK_CLIENT_KEY || "",
  tiktokClientSecret: process.env.TIKTOK_CLIENT_SECRET || "",
};
