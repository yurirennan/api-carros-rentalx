import { Response, Request } from "express";
import { container } from "tsyringe";

import CreateRentalUseCase from "./CreateRentalUseCase";

class CreateRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { car_id, expected_return_date } = request.body;
    const user_id = request.user.id;

    const createRentalUseCase = container.resolve(CreateRentalUseCase);

    const rental = await createRentalUseCase.execute({
      user_id,
      car_id,
      expected_return_date,
    });

    return response.status(201).json(rental);
  }
}

export default CreateRentalController;
