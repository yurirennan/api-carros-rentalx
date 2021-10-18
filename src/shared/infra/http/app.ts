import "reflect-metadata";

import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import { AppError } from "@shared/errors/AppError";
import createConnetion from "@shared/infra/typeorm";

import swaggerConfig from "../../../swagger.json";
import routes from "./routes";
import "@shared/container";

createConnetion();
const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));
app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal Server Error - ${err.message}`,
    });
  }
);

export default app;
