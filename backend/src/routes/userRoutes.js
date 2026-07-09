import { Router } from "express";
import { createUser, deleteUser, listUsers, updateUser } from "../controllers/userController.js";
import { authenticate, requireAdmin } from "../middleware/authenticate.js";

export const userRouter = Router();
userRouter.use(authenticate, requireAdmin);
userRouter.get("/", listUsers);
userRouter.post("/", createUser);
userRouter.patch("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
