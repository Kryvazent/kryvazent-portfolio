import cors from "cors";
import express from "express";
import { env } from "./config/env.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import { authRouter } from "./routes/authRoutes.js";
import { contentRouter } from "./routes/contentRoutes.js";
import { userRouter } from "./routes/userRoutes.js";
import { marketingRouter } from "./routes/marketingRoutes.js";

export const app = express();
const isAllowedOrigin = (origin) => {
  if (!origin) return true;
  const normalized = origin.replace(/\/$/, "");
  return env.frontendOrigins.includes(normalized) || (env.nodeEnv !== "production" && /^http:\/\/localhost:\d+$/.test(normalized));
};
app.use(cors({
  origin(origin, callback) {
    const allowed = isAllowedOrigin(origin);
    callback(allowed ? null : new Error(`Origin ${origin} is not allowed by CORS`), allowed);
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json({ limit: "1mb" }));
app.get("/api/health", (_request, response) => response.json({ status: "ok" }));
app.use("/api/auth", authRouter);
app.use("/api", contentRouter);
app.use("/api/admin/users", userRouter);
app.use("/api/admin/marketing", marketingRouter);
app.use(notFound);
app.use(errorHandler);
