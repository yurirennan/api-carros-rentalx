import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/providers/IDateProvider";

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,

    @inject("CarsRepository")
    private carsRepository: ICarsRepository,

    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ id, user_id }: IRequest) {
    const minimum_daily = 1;
    const rental = await this.rentalsRepository.findById(id);

    if (!rental) {
      throw new AppError("Rental not exists!");
    }

    const car = await this.carsRepository.findById(rental.car_id);

    // Verificar se a hora da devolução é menos de 24h e cobrar valor cheio
    const devolutionDate = this.dateProvider.createDate();
    let usedDays = this.dateProvider.compareInDays(
      rental.start_date,
      devolutionDate
    );

    if (usedDays <= 0) {
      usedDays = minimum_daily;
    }

    const daysUsedAfterExpirationDate = this.dateProvider.compareInDays(
      devolutionDate,
      rental.expected_return_date
    );

    let fineAmount = 0;

    if (daysUsedAfterExpirationDate > 0) {
      fineAmount = daysUsedAfterExpirationDate * car.fine_amount;
    }

    console.log(`Fine Amount = ${fineAmount}`);

    const totalValueOfRental = usedDays * car.daily_rate + fineAmount;

    console.log(`totalValueOfRental = ${totalValueOfRental}`);

    rental.end_date = devolutionDate;
    rental.total = totalValueOfRental;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailableStatus(car.id, true);
  }
}

export default DevolutionRentalUseCase;
