import { inject, injectable } from "tsyringe";

import Car from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,

    @inject("SpecificationRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findById(car_id);

    if (!carAlreadyExists) {
      throw new AppError("Car does not exists!");
    }

    const allSpecifications = await this.specificationsRepository.findByIds(
      specifications_id
    );

    if (allSpecifications.length === 0) {
      throw new AppError("Specifications does not exists!");
    }

    carAlreadyExists.specifications = allSpecifications;

    await this.carsRepository.create(carAlreadyExists);

    return carAlreadyExists;
  }
}

export default CreateCarSpecificationUseCase;
