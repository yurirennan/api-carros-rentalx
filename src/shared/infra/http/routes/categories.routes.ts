import { Router } from "express";
import multer from "multer";

import CreateCategoryControlller from "@modules/cars/useCases/createCategory/CreateCategoryController";
import ImportCategoryController from "@modules/cars/useCases/importCategory/ImportCategoryController";
import ListCategoriesController from "@modules/cars/useCases/listCategories/ListCategoriesController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const createCategoryControlller = new CreateCategoryControlller();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

const categoriesRoutes = Router();
const upload = multer({
  dest: "./tmp",
});

categoriesRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCategoryControlller.handle
);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  ensureAuthenticated,
  ensureAdmin,
  importCategoryController.handle
);

export default categoriesRoutes;
