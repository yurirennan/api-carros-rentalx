import { Router } from "express";

import SendForgetPasswordMailController from "@modules/accounts/useCases/sendForgetPasswordMail/SendForgetPasswordMailController";

const passwordRoutes = Router();

const sendForgetPasswordMailController = new SendForgetPasswordMailController();

passwordRoutes.post("/forgot", sendForgetPasswordMailController.handle);

export default passwordRoutes;
