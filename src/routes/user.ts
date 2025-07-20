import express from "express";

import { authMiddleware } from "../middlewares";
import { login, register, user } from "../controllers";
import { info } from "../controllers";
import { loggerMiddleware } from "../middlewares";
import { validation } from "../middlewares";
import { loginSchema, registerSchema } from "../utils";
import { queryValidator } from "../middlewares";
import { geoLocation } from "../middlewares";

const userRoute = express.Router();

userRoute.post("/login", validation(loginSchema), login);
userRoute.get("/", authMiddleware, user);
userRoute.post("/info", loggerMiddleware, info);
userRoute.post("/register", validation(registerSchema), register);

// middleware chaining

userRoute.post("/dashboard", loggerMiddleware, authMiddleware, user);
userRoute.post("/info/:id", queryValidator, geoLocation("IN"), info);


export { userRoute };
