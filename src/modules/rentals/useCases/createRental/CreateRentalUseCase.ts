import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import Rental from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/providers/IDateProvider";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,

    @inject("DateProvider")
    private dateProvider: IDateProvider,

    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );

    if (carUnavailable) {
      throw new AppError("Car is unavailable'");
    }

    const userWithOpenRental = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );

    if (userWithOpenRental) {
      throw new AppError("User with open car rental");
    }

    const dateNow = this.dateProvider.createDate();
    const rentalHours = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date
    );

    if (rentalHours < 24) {
      throw new AppError("Rent must be at least 24 hours");
    }

    this.carsRepository.updateAvailableStatus(car_id, false);

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    return rental;
  }
}

export default CreateRentalUseCase;
