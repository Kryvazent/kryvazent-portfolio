import bcrypt from "bcryptjs";
import { User } from "../models/User.js";

export const listUsers = async (_request, response) => response.json(await User.find().sort({ createdAt: -1 }));
export const createUser = async (request, response) => {
  const { name, email, password, role = "editor" } = request.body || {};
  if (!name || !email || !password || password.length < 10) return response.status(400).json({ message: "Name, email, and a password of at least 10 characters are required" });
  const user = await User.create({ name: String(name).trim(), email: String(email).toLowerCase().trim(), passwordHash: await bcrypt.hash(password, 12), role });
  response.status(201).json(user.toSafeObject());
};
export const updateUser = async (request, response) => {
  const user = await User.findById(request.params.id).select("+passwordHash");
  if (!user) return response.status(404).json({ message: "User not found" });
  const { name, email, password, role, active } = request.body || {};
  if (name !== undefined) user.name = String(name).trim();
  if (email !== undefined) user.email = String(email).toLowerCase().trim();
  if (role !== undefined) user.role = role;
  if (active !== undefined) user.active = Boolean(active);
  if (password) {
    if (password.length < 10) return response.status(400).json({ message: "Password must contain at least 10 characters" });
    user.passwordHash = await bcrypt.hash(password, 12);
  }
  await user.save();
  response.json(user.toSafeObject());
};
export const deleteUser = async (request, response) => {
  if (request.user.id === request.params.id) return response.status(400).json({ message: "You cannot delete your own account" });
  const user = await User.findByIdAndDelete(request.params.id);
  if (!user) return response.status(404).json({ message: "User not found" });
  response.status(204).end();
};
