import { Router } from "express";

import ResetPasswordController from "@modules/accounts/useCases/resetPassword/ResetPasswordController";
import SendForgetPasswordMailController from "@modules/accounts/useCases/sendForgetPasswordMail/SendForgetPasswordMailController";

const passwordRoutes = Router();

const sendForgetPasswordMailController = new SendForgetPasswordMailController();
const resetPasswordController = new ResetPasswordController();

passwordRoutes.post("/forgot", sendForgetPasswordMailController.handle);
passwordRoutes.post("/reset", resetPasswordController.handle);

export default passwordRoutes;
