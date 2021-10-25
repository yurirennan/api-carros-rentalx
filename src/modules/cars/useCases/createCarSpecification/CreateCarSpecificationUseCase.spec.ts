import CarsRepositoryInMemory from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import CreateCarSpecificationUseCase from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationRepositoryInMemory;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationRepositoryInMemory = new SpecificationRepositoryInMemory();

    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationRepositoryInMemory
    );
  });

  it("Should not be able to add a new specification to a now-existent car", async () => {
    const car_id = "1234";
    const specifications_id = ["54321"];
    await expect(
      createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      })
    ).rejects.toEqual(new AppError("Car does not exists!"));
  });

  it("Should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABCD-1234",
      fine_amount: 50,
      brand: "Brand",
      category_id: "Category",
    });

    const specification = await specificationRepositoryInMemory.create({
      name: "Specification 1",
      description: "Description 1",
    });

    const specification2 = await specificationRepositoryInMemory.create({
      name: "Specification 2",
      description: "Description 2",
    });

    const specificationsCar = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: [specification.id, specification2.id],
    });

    expect(specificationsCar).toHaveProperty("specifications");
    expect(specificationsCar.specifications.length).toBe(2);
  });
});
