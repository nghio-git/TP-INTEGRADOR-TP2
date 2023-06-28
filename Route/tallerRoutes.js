import { Router } from "express";
const tallerRoutes = Router();
import TallerController from "../Controller/tallerController.js";

const tallerController = new TallerController();

tallerRoutes.get("/", tallerController.getAllTalleres);
tallerRoutes.get("/:id", tallerController.getTallerById);
tallerRoutes.get("/me", tallerController.getMyselfTaller);
tallerRoutes.post("/", tallerController.createTaller);
tallerRoutes.post("/login", tallerController.loginTaller);
tallerRoutes.put("/:id", tallerController.updateTallerbyId);
tallerRoutes.delete("/:id", tallerController.deleteTallerById);

export default tallerRoutes;