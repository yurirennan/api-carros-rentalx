import { Request, Response } from "express";
import { container } from "tsyringe";

import DevolutionRentalUseCase from "./DevolutionRentalUseCase";

class DevolutionRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const user_id = request.user.id;

    const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase);

    await devolutionRentalUseCase.execute({
      id,
      user_id,
    });

    return response.status(200).send();
  }
}

export default DevolutionRentalController;
