import { Request, Response } from "express";
import { container } from "tsyringe";

import Car from "@modules/cars/infra/typeorm/entities/Car";

import ListAvailableCarsUseCase from "./ListAvailableCarsUseCase";

class ListAvailableCarsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { brand, category_id, name } = request.query;

    const listAvailableCarsUseCase = container.resolve(
      ListAvailableCarsUseCase
    );

    let cars: Car[];

    if (brand) {
      cars = await listAvailableCarsUseCase.findByBrand(String(brand));
    } else if (category_id) {
      cars = await listAvailableCarsUseCase.findByCategoryId(
        String(category_id)
      );
    } else if (name) {
      cars = await listAvailableCarsUseCase.findByName(String(name));
    } else {
      cars = await listAvailableCarsUseCase.execute();
    }

    return response.status(200).json(cars);
  }
}

export default ListAvailableCarsController;
