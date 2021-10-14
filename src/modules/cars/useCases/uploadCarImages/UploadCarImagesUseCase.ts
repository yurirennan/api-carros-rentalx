import { inject, injectable } from "tsyringe";

import { ICarImagesRepository } from "@modules/cars/repositories/ICarImagesRepository";

interface IRequest {
  car_id: string;
  imagesName: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarImagesRepository")
    private carsImagesRepository: ICarImagesRepository
  ) {}

  async execute({ car_id, imagesName }: IRequest): Promise<void> {
    imagesName.forEach(async (imageName) => {
      await this.carsImagesRepository.create(car_id, imageName);
    });
  }
}

export default UploadCarImagesUseCase;
