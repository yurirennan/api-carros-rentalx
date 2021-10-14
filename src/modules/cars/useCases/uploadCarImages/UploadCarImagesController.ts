import { Request, Response } from "express";
import { container } from "tsyringe";

import UploadCarImagesUseCase from "./UploadCarImagesUseCase";

interface IFiles {
  filename: string;
}

class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const uploadCarImageUseCase = container.resolve(UploadCarImagesUseCase);

    const { id } = request.params;
    const images = request.files as IFiles[];
    const fileNames = images.map((file) => file.filename);

    await uploadCarImageUseCase.execute({
      car_id: id,
      imagesName: fileNames,
    });

    return response.status(201).send();
  }
}

export default UploadCarImagesController;
