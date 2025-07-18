import express from "express";

import { authMiddleware } from "../middlewares";
import { login, register, user } from "../controllers";
import { info } from "../controllers";
import { loggerMiddleware } from "../middlewares";

export const userRoute = express.Router();

userRoute.post("/login", login);
userRoute.get("/", authMiddleware, user);
userRoute.post("/info", loggerMiddleware, info);
userRoute.post("/register", register);

// middleware chaining

userRoute.post("/dashboard", loggerMiddleware, authMiddleware, user);


