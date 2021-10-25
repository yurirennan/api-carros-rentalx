import ICreateCarDTO from "@modules/cars/dtos/ICreateCarDTO";
import Car from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    name,
    description,
    daily_rate,
    fine_amount,
    brand,
    category_id,
    license_plate,
    id,
    available,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      daily_rate,
      fine_amount,
      brand,
      category_id,
      license_plate,
    });

    this.cars.push(car);
    return car;
  }

  async updateAvailableStatus(
    car_id: string,
    availableStatus: boolean
  ): Promise<void> {
    const carIndex = this.cars.findIndex((car) => car.id === car_id);

    this.cars[carIndex].available = availableStatus;
  }

  async findById(car_id: string): Promise<Car> {
    const car = this.cars.find((car) => {
      return car.id === car_id;
    });

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => {
      return car.license_plate === license_plate;
    });
  }

  async findAllAvailable(): Promise<Car[]> {
    const cars = this.cars.filter((car) => car.available === true);
    return cars;
  }

  async findAllAvailableByName(name: string): Promise<Car[]> {
    const carsAvailable = this.cars.filter((car) => car.available === true);

    const cars = carsAvailable.filter((car) => car.name === name);
    return cars;
  }

  async findAllAvailableByCategoryId(category_id: string): Promise<Car[]> {
    const carsAvailable = this.cars.filter((car) => car.available === true);
    const cars = carsAvailable.filter((car) => car.category_id === category_id);

    return cars;
  }

  async findAllAvailableByBrand(brand: string): Promise<Car[]> {
    const carsAvailable = this.cars.filter((car) => car.available === true);

    const cars = carsAvailable.filter((car) => car.brand === brand);
    return cars;
  }
}

export default CarsRepositoryInMemory;
