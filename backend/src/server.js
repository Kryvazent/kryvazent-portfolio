import "dotenv/config";
import { app } from "./app.js";
import { connectDatabase } from "./config/database.js";
import { env } from "./config/env.js";
import { bootstrapData } from "./services/bootstrap.js";
import { startPublisher } from "./services/publisher.js";

let retryTimer;

const initializeDatabase = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await connectDatabase();
    await bootstrapData();
    startPublisher();
    console.log("MongoDB connected and application data initialized");
  } catch (error) {
    console.error("MongoDB initialization failed:", error instanceof Error ? error.message : error);
    console.error("Retrying MongoDB connection in 15 seconds");
    clearTimeout(retryTimer);
    retryTimer = setTimeout(() => void initializeDatabase(), 15_000);
  }
};

const server = app.listen(env.port, "0.0.0.0", () => {
  console.log(`Kryvazent CMS API listening on 0.0.0.0:${env.port}`);
  void initializeDatabase();
});

const shutdown = (signal) => {
  console.log(`${signal} received; shutting down`);
  clearTimeout(retryTimer);
  server.close(() => process.exit(0));
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
