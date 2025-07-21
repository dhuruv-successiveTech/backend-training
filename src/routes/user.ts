import express from "express";

import { login, register, user, info } from "../controllers";
import {
  loggerMiddleware,
  validation,
  queryValidator,
  geoLocation,
  authMiddleware,
} from "../middlewares";
import { loginSchema, registerSchema } from "../utils";

const userRoute = express.Router();

userRoute.post("/login", validation(loginSchema), login);
userRoute.get("/", authMiddleware, user);
userRoute.post("/info", loggerMiddleware, info);
userRoute.post("/register", validation(registerSchema), register);

// middleware chaining

userRoute.post("/dashboard", loggerMiddleware, authMiddleware, user);
userRoute.post("/info/:id", queryValidator, geoLocation("IN"), info);

export { userRoute };
