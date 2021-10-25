import dayjs from "dayjs";

import CarsRepositoryInMemory from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import RentalsRepositoryInMemory from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import DateProvider from "@shared/providers/implementations/DateProvider";

import CreateRentalUseCase from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dateProvider: DateProvider;

describe("Create Rental", () => {
  const dayAdd48Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    dateProvider = new DateProvider();
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dateProvider,
      carsRepositoryInMemory
    );
  });

  it("Should be able to create a new Rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABCD-1234",
      fine_amount: 50,
      brand: "Brand",
      category_id: "Uno",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayAdd48Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should not be able to create a new Rental, if there another open rental to same user", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABCD-1234",
      fine_amount: 50,
      brand: "Brand",
      category_id: "Uno",
    });

    const car2 = await carsRepositoryInMemory.create({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABCD-1234",
      fine_amount: 50,
      brand: "Brand",
      category_id: "Uno",
    });

    await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayAdd48Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "12345",
        car_id: car2.id,
        expected_return_date: dayAdd48Hours,
      })
    ).rejects.toEqual(new AppError("User with open car rental"));
  });

  it("Should not be able to create a new Rental, if there another open rental to same car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABCD-1234",
      fine_amount: 50,
      brand: "Brand",
      category_id: "Uno",
    });

    await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayAdd48Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "123456",
        car_id: car.id,
        expected_return_date: dayAdd48Hours,
      })
    ).rejects.toEqual(new AppError("Car is unavailable"));
  });

  it("Should not be able to create a new Rental with invalid return time", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABCD-1234",
      fine_amount: 50,
      brand: "Brand",
      category_id: "Uno",
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "12345",
        car_id: car.id,
        expected_return_date: dateProvider.createDate(),
      })
    ).rejects.toEqual(new AppError("Rent must be at least 24 hours"));
  });
});
