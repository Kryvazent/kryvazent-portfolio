import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, unique: true, required: true, lowercase: true, trim: true, index: true },
  passwordHash: { type: String, required: true, select: false },
  role: { type: String, enum: ["admin", "editor"], default: "editor" },
  team: { type: String, enum: ["marketing", "maintenance", "project_management", "administrative"], default: "maintenance" },
  active: { type: Boolean, default: true },
  lastLoginAt: { type: Date, default: null },
}, { timestamps: true });

UserSchema.methods.toSafeObject = function toSafeObject() {
  return { id: this.id, name: this.name, email: this.email, role: this.role, team: this.team, active: this.active, lastLoginAt: this.lastLoginAt, createdAt: this.createdAt, updatedAt: this.updatedAt };
};

export const User = mongoose.model("User", UserSchema);
