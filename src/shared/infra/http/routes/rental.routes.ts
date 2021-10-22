import { Router } from "express";

import CreateRentalController from "@modules/rentals/useCases/createRental/CreateRentalController";
import DevolutionRentalController from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalRoutes = Router();

const createRentalUseController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

rentalRoutes.post("/", ensureAuthenticated, createRentalUseController.handle);
rentalRoutes.post(
  "/devolutions/:id",
  ensureAuthenticated,
  devolutionRentalController.handle
);

export default rentalRoutes;
