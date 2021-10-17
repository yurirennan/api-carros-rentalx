import { Router } from "express";

import CreateRentalController from "@modules/rentals/useCases/createRental/CreateRentalController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalRoutes = Router();

const createRentalUseController = new CreateRentalController();

rentalRoutes.post("/", ensureAuthenticated, createRentalUseController.handle);

export default rentalRoutes;
