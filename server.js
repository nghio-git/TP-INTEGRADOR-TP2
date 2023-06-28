import express from "express";
const app = express();
import { serverPort } from "./config.js";
import indexRoutes from "./Route/indexRoutes.js";
import connection from "./Connection/connection.js";
import roleSeed from "./Seed/roleSeed.js";

//middleware, etc.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(indexRoutes);

app.use((error, req, res, next) => {
  res
    .status(error.status || 500)
    .send({ success: false, message: error.message });
});

await connection
  .sync({ force: false })
  .then(() => {
    app.listen(serverPort, () => {
      console.log("Server running at http://localhost:" + serverPort);
    });
  })
  .then(roleSeed);
