import { Router } from "express";
import { authenticate } from "../utils/jwt";

import {
  getUsers as getUsersController,
  getSelf as getSelfController,
  postUser as postUserController
} from "../controller/user";

export const users = Router();

users.route("/").get(authenticate, getUsersController);

users.route("/self").get(authenticate, getSelfController);
