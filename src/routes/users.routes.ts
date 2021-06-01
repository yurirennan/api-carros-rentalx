import { Router } from "express";

import CreateUserController from "../modules/accounts/useCases/createUser/CreateUserController";

const userRoutes = Router();

const UserController = new CreateUserController();

userRoutes.post("/", UserController.handle);

export default userRoutes;
