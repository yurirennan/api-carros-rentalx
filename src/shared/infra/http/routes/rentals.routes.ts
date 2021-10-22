import { Router } from "express";

import CreateRentalController from "@modules/rentals/useCases/createRental/CreateRentalController";
import DevolutionRentalController from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import ListRentalsByUserController from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalRoutes = Router();

const createRentalUseController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsController = new ListRentalsByUserController();

rentalRoutes.post("/", ensureAuthenticated, createRentalUseController.handle);
rentalRoutes.post(
  "/devolutions/:id",
  ensureAuthenticated,
  devolutionRentalController.handle
);
rentalRoutes.get("/", ensureAuthenticated, listRentalsController.handle);

export default rentalRoutes;
