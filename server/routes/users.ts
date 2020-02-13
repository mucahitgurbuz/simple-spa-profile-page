import { Router } from "express";
import { authenticate } from "../utils/jwt";
import uploadHandler from "../utils/uploadHandler";

import {
  postUser as postUserValidator,
  updateUser as updateUserValidator,
  updatePassword as updatePasswordValidator
} from "../validator/user";

import {
  getUsers as getUsersController,
  getSelf as getSelfController,
  postUser as postUserController,
  updateUser as updateUserController,
  updatePassword as updatePasswordController
} from "../controller/user";

export const users = Router();

users
  .route("/")
  .get(authenticate, getUsersController)
  .post(uploadHandler.single("avatar"), postUserValidator, postUserController)
  .put(
    authenticate,
    uploadHandler.single("avatar"),
    updateUserValidator,
    updateUserController
  );

users
  .route("/password")
  .put(authenticate, updatePasswordValidator, updatePasswordController);

users.route("/self").get(authenticate, getSelfController);
