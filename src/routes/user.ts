import express from "express";

import { authMiddleware } from "../middlewares";
import { login, register, user } from "../controllers";
import { info } from "../controllers";
import { loggerMiddleware } from "../middlewares";
import { validation } from "../middlewares";
import { loginSchema, registerSchema } from "../utils";
import { queryValidator } from "../middlewares";
import { geoLocation } from "../middlewares";

const router = express.Router();

router.post("/login", validation(loginSchema), login);
router.get("/", authMiddleware, user);
router.post("/info", loggerMiddleware, info);
router.post("/register", validation(registerSchema), register);

// middleware chaining

router.post("/dashboard", loggerMiddleware, authMiddleware, user);
router.post("/:id", queryValidator, geoLocation("IN"), info);


export { router };
