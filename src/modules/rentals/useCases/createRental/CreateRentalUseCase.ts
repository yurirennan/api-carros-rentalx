import { inject, injectable } from "tsyringe";

import Rental from "@modules/rentals/infra/typeorm/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/providers/IDateProvider";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

// @injectable()
class CreateRentalUseCase {
  constructor(
    // @inject()
    private rentalsRepository: IRentalsRepository,
    private dateProvider: IDateProvider
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

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    return rental;
  }
}

export default CreateRentalUseCase;
