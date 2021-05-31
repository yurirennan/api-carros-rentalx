import { container } from "tsyringe";

import { ICategoriesRespository } from "../../modules/cars/repositories/ICategoriesRespository";
import CategoriesRepository from "../../modules/cars/repositories/implementations/CategoriesRepository";
import SpecificationRepository from "../../modules/cars/repositories/implementations/SpecificationsRepository";
import { ISpecificationsRepository } from "../../modules/cars/repositories/ISpecificationsRepository";

// Registra dependencia
container.registerSingleton<ICategoriesRespository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationRepository",
  SpecificationRepository
);
