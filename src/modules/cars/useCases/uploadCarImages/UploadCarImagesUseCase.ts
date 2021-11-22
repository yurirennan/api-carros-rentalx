import { inject, injectable } from "tsyringe";

import { ICarImagesRepository } from "@modules/cars/repositories/ICarImagesRepository";
import { IStorageProvider } from "@shared/providers/IStorageProvider";

interface IRequest {
  car_id: string;
  imagesName: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarImagesRepository")
    private carsImagesRepository: ICarImagesRepository,

    @inject("StorageProvider")
    private storateProvider: IStorageProvider
  ) {}

  async execute({ car_id, imagesName }: IRequest): Promise<void> {
    imagesName.forEach(async (imageName) => {
      await this.carsImagesRepository.create(car_id, imageName);
      await this.storateProvider.save(imageName, "cars");
    });
  }
}

export default UploadCarImagesUseCase;
