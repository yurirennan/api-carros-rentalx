import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import CreateCarController from "@modules/cars/useCases/createCar/CreateCarController";
import CreateCarSpecificationController from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import ListAvailableCarsController from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import UploadCarImagesController from "@modules/cars/useCases/uploadCarImages/UploadCarImagesController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarsController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const uploadCarImages = multer(uploadConfig.upload("./tmp/cars"));

carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarsController.handle
);

carsRoutes.get("/availables", listAvailableCarsController.handle);
carsRoutes.post(
  "/specifications/:id",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
);

carsRoutes.post(
  "/upload-images/:id",
  ensureAuthenticated,
  ensureAdmin,
  uploadCarImages.array("images"),
  uploadCarImagesController.handle
);

export default carsRoutes;
