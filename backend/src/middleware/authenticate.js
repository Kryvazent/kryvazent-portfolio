import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { User } from "../models/User.js";

export const authenticate = async (request, response, next) => {
  const token = request.headers.authorization?.replace(/^Bearer\s+/i, "");
  if (!token) return response.status(401).json({ message: "Authentication required" });
  try {
    const payload = jwt.verify(token, env.jwtSecret);
    const user = await User.findById(payload.sub);
    if (!user || !user.active) return response.status(401).json({ message: "Account is unavailable" });
    request.user = user;
    next();
  } catch {
    response.status(401).json({ message: "Session expired or invalid" });
  }
};

export const requireAdmin = (request, response, next) => {
  if (request.user?.role !== "admin") return response.status(403).json({ message: "Administrator access required" });
  next();
};

export const requireTeams = (...teams) => (request, response, next) => {
  if (request.user?.role === "admin" || request.user?.team === "administrative" || teams.includes(request.user?.team)) return next();
  response.status(403).json({ message: "Your team does not have access to this area" });
};
