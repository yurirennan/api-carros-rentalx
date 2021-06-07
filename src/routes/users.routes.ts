import { Router } from "express";
import multer from "multer";

import uploadOptions from "../config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import CreateUserController from "../modules/accounts/useCases/createUser/CreateUserController";
import UploadUserAvatarController from "../modules/accounts/useCases/uploadUserAvatar/UploadUserAvatarController";

const userRoutes = Router();

const uploadAvatar = multer(uploadOptions.upload("./tmp/avatar"));

const UserController = new CreateUserController();
const UploadAvatarController = new UploadUserAvatarController();

userRoutes.post("/", UserController.handle);
userRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  UploadAvatarController.handle
);

export default userRoutes;
