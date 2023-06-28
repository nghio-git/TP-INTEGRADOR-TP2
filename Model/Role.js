import { DataTypes as DT } from "sequelize";
import connection from "../Connection/connection.js";

const Role = connection.define(
  "Role",
  {
    role: {
      type: DT.STRING(),
    },
  },
  {
    timestamps: false,
  }
);

export default Role;
