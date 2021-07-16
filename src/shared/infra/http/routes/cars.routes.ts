import { Router } from "express";

import CreateCarController from "@modules/cars/useCases/createCar/CreateCarController";
import ListAvailableCarsController from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarsController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarsController.handle
);

carsRoutes.get("/availables", listAvailableCarsController.handle);

export default carsRoutes;
