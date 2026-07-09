import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { User } from "../models/User.js";

export const login = async (request, response) => {
  const email = String(request.body?.email || "").toLowerCase().trim();
  const password = String(request.body?.password || "");
  const user = await User.findOne({ email }).select("+passwordHash");
  if (!user || !user.active || !(await bcrypt.compare(password, user.passwordHash))) return response.status(401).json({ message: "Invalid email or password" });
  user.lastLoginAt = new Date();
  await user.save();
  const token = jwt.sign({ sub: user.id, role: user.role }, env.jwtSecret, { expiresIn: "8h" });
  response.json({ token, user: user.toSafeObject() });
};

export const currentUser = async (request, response) => response.json(request.user.toSafeObject());
