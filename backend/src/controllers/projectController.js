import { ClientProject } from "../models/ClientProject.js";
import { User } from "../models/User.js";

const populateProject = (query) => query
  .populate("assignedStaff", "name email team active")
  .populate("tasks.assignee", "name email team")
  .populate("notes.author", "name email");

export const listProjects = async (request, response) => {
  const filter = {};
  if (request.query.status) filter.status = request.query.status;
  if (request.query.search) filter.$or = [
    { name: { $regex: request.query.search, $options: "i" } },
    { clientCompany: { $regex: request.query.search, $options: "i" } },
  ];
  response.json(await populateProject(ClientProject.find(filter).sort({ updatedAt: -1 })));
};
export const getProject = async (request, response) => {
  const project = await populateProject(ClientProject.findById(request.params.id));
  if (!project) return response.status(404).json({ message: "Project not found" });
  response.json(project);
};
export const createProject = async (request, response) => {
  const project = await ClientProject.create({ ...request.body, createdBy: request.user._id });
  response.status(201).json(await populateProject(ClientProject.findById(project._id)));
};
export const updateProject = async (request, response) => {
  const project = await populateProject(ClientProject.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true }));
  if (!project) return response.status(404).json({ message: "Project not found" });
  response.json(project);
};
export const deleteProject = async (request, response) => {
  const project = await ClientProject.findByIdAndDelete(request.params.id);
  if (!project) return response.status(404).json({ message: "Project not found" });
  response.status(204).end();
};
export const addTask = async (request, response) => {
  const project = await ClientProject.findById(request.params.id);
  if (!project) return response.status(404).json({ message: "Project not found" });
  project.tasks.push(request.body);
  await project.save();
  response.status(201).json(await populateProject(ClientProject.findById(project._id)));
};
export const addMilestone = async (request, response) => {
  const project = await ClientProject.findById(request.params.id);
  if (!project) return response.status(404).json({ message: "Project not found" });
  project.milestones.push(request.body);
  await project.save();
  response.status(201).json(await populateProject(ClientProject.findById(project._id)));
};
export const addNote = async (request, response) => {
  const project = await ClientProject.findById(request.params.id);
  if (!project) return response.status(404).json({ message: "Project not found" });
  project.notes.push({ body: request.body.body, author: request.user._id });
  await project.save();
  response.status(201).json(await populateProject(ClientProject.findById(project._id)));
};
export const addLink = async (request, response) => {
  const project = await ClientProject.findById(request.params.id);
  if (!project) return response.status(404).json({ message: "Project not found" });
  project.links.push(request.body);
  await project.save();
  response.status(201).json(await populateProject(ClientProject.findById(project._id)));
};
export const listAssignableStaff = async (_request, response) => {
  response.json(await User.find({ active: true }).select("name email team").sort({ name: 1 }));
};
