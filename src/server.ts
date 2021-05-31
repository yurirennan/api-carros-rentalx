import "reflect-metadata";

import express from "express";
import swaggerUi from "swagger-ui-express";

import routes from "./routes";
import swaggerConfig from "./swagger.json";

import "./database";
import "./shared/container";

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));
app.use(routes);

app.listen(3333, () => {
  console.log("Server is Running...");
});
