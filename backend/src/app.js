import cors from "cors";
import express from "express";
import { env } from "./config/env.js";
import { getDatabaseStatus } from "./config/database.js";
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
app.get("/", (_request, response) => response.json({
  name: "Kryvazent CMS API",
  status: "ok",
  health: "/api/health",
}));
app.get("/api/health", (_request, response) => response.json({
  status: "ok",
  database: getDatabaseStatus().status,
  uptime: Math.round(process.uptime()),
}));
app.use("/api", (_request, response, next) => {
  if (!getDatabaseStatus().ready) {
    return response.status(503).json({
      message: "Database is temporarily unavailable",
      database: getDatabaseStatus().status,
    });
  }
  next();
});
app.use("/api/auth", authRouter);
app.use("/api", contentRouter);
app.use("/api/admin/users", userRouter);
app.use("/api/admin/marketing", marketingRouter);
app.use(notFound);
app.use(errorHandler);
