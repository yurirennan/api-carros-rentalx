import { inject, injectable } from "tsyringe";

import Car from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute(): Promise<Car[]> {
    const cars = await this.carsRepository.findAllAvailable();

    return cars;
  }

  async findByName(name: string): Promise<Car[]> {
    const cars = await this.carsRepository.findAllAvailableByName(name);
    return cars;
  }

  async findByCategoryId(category_id: string): Promise<Car[]> {
    const cars = await this.carsRepository.findAllAvailableByCategoryId(
      category_id
    );

    return cars;
  }

  async findByBrand(brand: string): Promise<Car[]> {
    const cars = await this.carsRepository.findAllAvailableByBrand(brand);

    return cars;
  }
}

export default ListAvailableCarsUseCase;
