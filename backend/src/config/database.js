import mongoose from "mongoose";
import { env } from "./env.js";

let status = "disconnected";
let lastError = "";

mongoose.set("bufferCommands", false);
mongoose.connection.on("connected", () => {
  status = "connected";
  lastError = "";
});
mongoose.connection.on("disconnected", () => {
  status = "disconnected";
});
mongoose.connection.on("error", (error) => {
  status = "error";
  lastError = error.message;
});

export const connectDatabase = async () => {
  status = "connecting";
  try {
    await mongoose.connect(env.mongoUri, {
      serverSelectionTimeoutMS: 10_000,
      connectTimeoutMS: 10_000,
    });
  } catch (error) {
    status = "error";
    lastError = error instanceof Error ? error.message : "Unknown database error";
    throw error;
  }
};

export const getDatabaseStatus = () => ({
  status,
  ready: mongoose.connection.readyState === 1,
  lastError,
});
