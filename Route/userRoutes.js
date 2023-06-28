import { Router } from "express";
const userRoutes = Router();
import UserController from "../Controller/userController.js";

const userController = new UserController();

userRoutes.get("/", userController.getAllUsers);
userRoutes.get("/:id", userController.getUserById);
userRoutes.get("/me", userController.getMyselfUser)
userRoutes.post("/", userController.createUser);
userRoutes.post("/login", userController.loginUser);
userRoutes.put("/:id", userController.updateUserById);
userRoutes.delete("/:id", userController.deleteUserById);

export default userRoutes;
