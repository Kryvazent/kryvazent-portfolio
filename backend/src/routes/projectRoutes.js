import { Router } from "express";
import { addLink, addMilestone, addNote, addTask, createProject, deleteProject, getProject, listAssignableStaff, listProjects, updateProject } from "../controllers/projectController.js";
import { authenticate, requireTeams } from "../middleware/authenticate.js";

export const projectRouter = Router();
projectRouter.use(authenticate, requireTeams("project_management"));
projectRouter.get("/", listProjects);
projectRouter.post("/", createProject);
projectRouter.get("/staff-options", listAssignableStaff);
projectRouter.get("/:id", getProject);
projectRouter.patch("/:id", updateProject);
projectRouter.delete("/:id", deleteProject);
projectRouter.post("/:id/tasks", addTask);
projectRouter.post("/:id/milestones", addMilestone);
projectRouter.post("/:id/notes", addNote);
projectRouter.post("/:id/links", addLink);
