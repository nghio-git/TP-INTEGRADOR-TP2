import { Router } from "express";
import userRoutes from "./userRoutes.js";
import tallerRoutes from "./tallerRoutes.js";
const indexRoutes = Router();

indexRoutes.use("/users", userRoutes);
indexRoutes.use("/talleres", tallerRoutes)

export default indexRoutes;