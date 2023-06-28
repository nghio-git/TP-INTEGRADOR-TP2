import { User, Role } from "../Model/index.js";

class userController {
  constructor() {}
  createUser = async (req, res, next) => {
    try {
      const { nombre, apellido, telefono, email, password } = req.body;
      const result = await User.create({
        nombre,
        apellido,
        telefono,
        email,
        password,
      });
      if (!result) throw new Error("Unable to create user.");
      res
        .status(200)
        .send({ success: true, message: "User created." });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };
  getAllUsers = async (req, res, next) => {
    try {
      const result = await User.findAll({
        attributes: ["id", "nombre", "apellido", "email", "roleId"],
        include: [
          {
            model: Role,
            attributes: ["role"],
            as: "role",
          },
        ],
      });
      if (result.length === 0) {
        const error = new Error("No users...");
        error.status = 400;
        throw error;
      }
      res
        .status(200)
        .send({ success: true, message: "Users found,", result });
    } catch (error) {
      next(error);
    }
  };
  getUserById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await User.findOne({
        where: { id },
        attributes: ["id", "nombre", "apellido", "email"],
      });
      if (!result) throw new Error("Unable to find user.");
      res
        .status(200)
        .send({ success: true, message: "User found.", result });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };
  updateUserById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await User.findByPk(id);
      const updResult = await result.update(req.body)
      res.status(200).send({ success: true, message: "User (data) updated." });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };
  deleteUserById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await User.destroy({
          where: { id, },
      });
      if (!result) throw new Error ("Unable to delete user.")
      
      res
      .status(200)
      .send({ success: true, message: "User deleted." });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };
  loginUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const result = await User.findOne({
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
  getMyselfUser = async (req, res, next) => {
    const { user } = req
    res
    .status(200)
    .send({ success: true, message: "User", user });
  };
}

export default userController;
