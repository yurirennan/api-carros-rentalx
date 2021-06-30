import { container } from "tsyringe";

import UsersRepository from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";
import CategoriesRepository from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import SpecificationRepository from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { ICategoriesRespository } from "@modules/cars/repositories/ICategoriesRespository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

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
