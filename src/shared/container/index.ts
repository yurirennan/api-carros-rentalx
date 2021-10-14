import { container } from "tsyringe";

import UsersRepository from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";
import CarImagesRepository from "@modules/cars/infra/typeorm/repositories/CarImagesRepository";
import CarsRepository from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import CategoriesRepository from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import SpecificationRepository from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { ICarImagesRepository } from "@modules/cars/repositories/ICarImagesRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
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

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);

container.registerSingleton<ICarImagesRepository>(
  "CarImagesRepository",
  CarImagesRepository
);
