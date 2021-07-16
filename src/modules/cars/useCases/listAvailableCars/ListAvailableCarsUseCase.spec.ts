import CarsRepositoryInMemory from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import ListAvailableCarsUseCase from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("Should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car test",
      description: "Car test",
      daily_rate: 10,
      license_plate: "TEST-000",
      fine_amount: 10,
      brand: "TEST",
      category_id: "Category Test",
    });

    const cars = await listAvailableCarsUseCase.execute();

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all availables cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car test",
      description: "Car test",
      daily_rate: 10,
      license_plate: "TEST-000",
      fine_amount: 10,
      brand: "TEST",
      category_id: "Category Test",
    });

    const car2 = await carsRepositoryInMemory.create({
      name: "Car test",
      description: "Car test",
      daily_rate: 10,
      license_plate: "TEST-000",
      fine_amount: 10,
      brand: "TEST",
      category_id: "Category Test",
    });

    const cars = await listAvailableCarsUseCase.findByName("Car test");

    expect(cars).toEqual([car, car2]);
  });

  it("Should be able to list all available cars by category id", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car test",
      description: "Car test",
      daily_rate: 10,
      license_plate: "TEST-000",
      fine_amount: 10,
      brand: "TEST",
      category_id: "Category Test",
    });

    const car2 = await carsRepositoryInMemory.create({
      name: "Car test",
      description: "Car test",
      daily_rate: 10,
      license_plate: "TEST-000",
      fine_amount: 10,
      brand: "TEST",
      category_id: "Category Test",
    });

    const car3 = await carsRepositoryInMemory.create({
      name: "Car test",
      description: "Car test",
      daily_rate: 10,
      license_plate: "TEST-000",
      fine_amount: 10,
      brand: "TEST",
      category_id: "Category",
    });

    const cars = await listAvailableCarsUseCase.findByCategoryId("Category");

    expect(cars).toEqual([car3]);
  });

  it("Should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car test",
      description: "Car test",
      daily_rate: 10,
      license_plate: "TEST-000",
      fine_amount: 10,
      brand: "TEST",
      category_id: "Category Test",
    });
    const car2 = await carsRepositoryInMemory.create({
      name: "Car test",
      description: "Car test",
      daily_rate: 10,
      license_plate: "TEST-000",
      fine_amount: 10,
      brand: "TEST",
      category_id: "Category Test",
    });
    const car3 = await carsRepositoryInMemory.create({
      name: "Car test",
      description: "Car test",
      daily_rate: 10,
      license_plate: "TEST-000",
      fine_amount: 10,
      brand: "TEST drive",
      category_id: "Category Test",
    });

    const cars = await listAvailableCarsUseCase.findByBrand("TEST");

    expect(cars).toEqual([car, car2]);
  });
});
