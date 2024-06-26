import { Sequelize } from "sequelize";
import {
  database,
  username,
  password,
  host,
  dialect,
  port,
} from "../config.js";

const connection = new Sequelize(database, username, password, {
  host,
  dialect,
  port,
});

try {
  await connection.authenticate();
  console.log("Connection to DB established!.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

export default connection;
