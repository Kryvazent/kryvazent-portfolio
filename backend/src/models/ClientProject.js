import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, trim: true, lowercase: true, default: "" },
  phone: { type: String, trim: true, default: "" },
  role: { type: String, trim: true, default: "" },
});
const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  status: { type: String, enum: ["todo", "in_progress", "blocked", "done"], default: "todo" },
  priority: { type: String, enum: ["low", "medium", "high", "urgent"], default: "medium" },
  dueDate: { type: Date, default: null },
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
}, { timestamps: true });
const MilestoneSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
  dueDate: { type: Date, default: null },
  status: { type: String, enum: ["planned", "active", "completed", "delayed"], default: "planned" },
  amount: { type: Number, min: 0, default: 0 },
}, { timestamps: true });
const NoteSchema = new mongoose.Schema({
  body: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });
const LinkSchema = new mongoose.Schema({
  label: { type: String, required: true },
  url: { type: String, required: true },
  category: { type: String, enum: ["repository", "design", "deployment", "document", "other"], default: "other" },
});

const ClientProjectSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  clientCompany: { type: String, required: true, trim: true },
  contacts: { type: [ContactSchema], default: [] },
  description: { type: String, default: "" },
  scope: { type: String, default: "" },
  services: [{ type: String }],
  status: { type: String, enum: ["lead", "discovery", "proposal", "active", "on_hold", "completed", "cancelled"], default: "lead", index: true },
  priority: { type: String, enum: ["low", "medium", "high", "urgent"], default: "medium" },
  budget: { type: Number, min: 0, default: 0 },
  currency: { type: String, default: "USD", uppercase: true, trim: true },
  startDate: { type: Date, default: null },
  targetEndDate: { type: Date, default: null },
  actualEndDate: { type: Date, default: null },
  assignedStaff: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  milestones: { type: [MilestoneSchema], default: [] },
  tasks: { type: [TaskSchema], default: [] },
  notes: { type: [NoteSchema], default: [] },
  links: { type: [LinkSchema], default: [] },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

export const ClientProject = mongoose.model("ClientProject", ClientProjectSchema);
