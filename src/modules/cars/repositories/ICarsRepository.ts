import ICreateCarDTO from "../dtos/ICreateCarDTO";
import Car from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findById(car_id: string): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findAllAvailable(): Promise<Car[]>;
  findAllAvailableByName(name: string): Promise<Car[]>;
  findAllAvailableByCategoryId(category_id: string): Promise<Car[]>;
  findAllAvailableByBrand(brand: string): Promise<Car[]>;
}

export { ICarsRepository };
