import CarsRepositoryInMemory from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import CreateCarUseCase from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABCD-1234",
      fine_amount: 50,
      brand: "Brand",
      category_id: "Uno",
    });

    expect(car).toHaveProperty("id");
    expect(car).toHaveProperty("available");
  });

  it("should not be able to create a new car with same license plate", async () => {
    await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABCD-1234",
      fine_amount: 50,
      brand: "Brand",
      category_id: "Uno",
    });

    await expect(
      createCarUseCase.execute({
        name: "Name Car",
        description: "Description Car",
        daily_rate: 100,
        license_plate: "ABCD-1234",
        fine_amount: 50,
        brand: "Brand",
        category_id: "Uno",
      })
    ).rejects.toEqual(new AppError("Car already exists!"));
  });

  it("should be able to create a new car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABCD-1234",
      fine_amount: 50,
      brand: "Brand",
      category_id: "Uno",
    });

    expect(car.available).toBe(true);
  });
});
