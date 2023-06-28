import { Taller, Role } from "../Model/index.js";

class tallerController{
    constructor () {}
    createTaller = async (req, res, next) => {
        try{
            const { 
                nombre, 
                telefono, 
                direccion, 
                email, 
                password,
                tipo,
            } = req.body;
            const result = await Taller.create({
                nombre,
                telefono,
                direccion,
                email,
                password,
                tipo,
            });
            if(!result) throw new Error("Unable to create taller.");
            res
            .status(200)
            .send({ success: true, message: "Taller created." });
        } catch (error){
            res.status(400).send({ success: false, message: error.message });
        }
    };
    getTallerById = async (req, res, next) => {
        try{
            const { id } = req.params
            const result = await Taller.findOne({
                where: { id, },
                attributes: ["id", "nombre", "direccion", "email", "tipo", "estaDisponible"],
            });
            if (!result) throw new Error("Unable to find taller.");
            res
            .status(200)
            .send({ success: true, message: "Taller found.", result });
        } catch (error) {
            res.status(400).send({ success: false, message: error.message });
        }
    };
    getAllTalleres = async (req, res, next) => {
        try{
            const result = await Taller.findAll({
                attributes: ["id", "nombre", "direccion", "email", "tipo", "estaDisponible"],
                include: [{ model: Role, attributes: ["role"], as: "role",}]
            });
            if (result.length === 0) {
                const error = new Error("No talleres...");
                error.status = 400;
                throw error;
            }
            res
            .status(200)
            .send({ success: true, message: "Talleres found,", result });  
        } catch (error){
            next(error)
        }
    };
    updateTallerbyId = async (req, res, next) => {
        try {
            const { id } = req.params;
            const result = await Taller.findByPk(id);
            const updResult = await result.update(req.body)
            if (!updResult) throw new Error ("Unable to update Taller.")

            res
            .status(200)
            .send({ success: true, message: "Taller (data) updated." });
          } catch (error) {
            res.status(400).send({ success: false, message: error.message });
          }
    };
    deleteTallerById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const result = await Taller.destroy({
                where: { id, },
            });
            if (!result) throw new Error ("Unable to delete Taller.")

            res
            .status(200)
            .send({ success: true, message: "Taller deleted." });
          } catch (error) {
            res.status(400).send({ success: false, message: error.message });
          }
      };
    loginTaller = async (req, res, next) => {
        try {
          const { email, password } = req.body;
          const result = await Taller.findOne({
            where: {
              email,
            },
          });
          if (!result) throw new Error("Bad credentials.");
          const hash = await result.validatePassword(password);
    
          if (!hash) throw new Error("Bad credentials.");
    
          res
            .status(200)
            .send({ success: true, message: "Login successful." });
        } catch (error) {
          res.status(400).send({ success: false, message: error.message });
        }
      };
      getMyselfTaller = async (req, res, next) => {
        const { taller } = req
        res
        .status(200)
        .send({ success: true, message: "Taller", taller });
      }
}

export default tallerController