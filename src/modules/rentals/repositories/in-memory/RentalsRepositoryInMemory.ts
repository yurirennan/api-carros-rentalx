import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import Rental from "@modules/rentals/infra/typeorm/entities/Rental";

import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
  repository: Rental[];

  constructor() {
    this.repository = [];
  }

  async create({
    user_id,
    car_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      user_id,
      car_id,
      expected_return_date,
      start_date: new Date(),
    });

    this.repository.push(rental);
    return rental;
  }

  async findById(id: string): Promise<Rental> {
    const rental = this.repository.find((rental) => rental.id === id);

    return rental;
  }

  async findAllRentalsByUserId(user_id: string): Promise<Rental[]> {
    const rentals = this.repository.filter(
      (rental) => rental.user_id === user_id
    );

    return rentals;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const rental = this.repository.find((rental) => {
      return rental.car_id === car_id && !rental.end_date;
    });

    return rental;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const rental = this.repository.find((rental) => {
      return rental.user_id === user_id && !rental.end_date;
    });

    return rental;
  }
}

export default RentalsRepositoryInMemory;
