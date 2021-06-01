import { container } from "tsyringe";

import UsersRepository from "../../modules/accounts/repositories/implementations/UsersRepository";
import IUsersRepository from "../../modules/accounts/repositories/IUsersRepository";
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

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
