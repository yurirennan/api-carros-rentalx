import { Router } from "express";

import CreateSpecificationController from "../modules/cars/useCases/createSpecification";

const specificationsRoutes = Router();

specificationsRoutes.post("/", (request, response) => {
  return CreateSpecificationController.handle(request, response);
});

export default specificationsRoutes;
