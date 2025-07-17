import express from "express";

import { authMiddleware } from "../middlewares/auth";
import { login, register, user } from "../controllers/user";
import { info } from "../controllers/dataSeed";
import { loggerMiddleware } from "../middlewares/logger";
import { validation } from "../middlewares/validation";
import { loginSchema, registerSchema } from "../utils/userSchema";
import { queryValidator } from "../middlewares/queryValidator";
import { geoLocation } from "../middlewares/geoLocation";

const router = express.Router();

router.post("/user/login", validation(loginSchema), login);
router.get("/user", authMiddleware, user);
router.post("/user/info", loggerMiddleware, info);
router.post("/user/register", validation(registerSchema), register);
router.post("/user/:id", queryValidator, geoLocation("IN"), info);

// middleware chaining

router.post("/user/dashboard", loggerMiddleware, authMiddleware, user);

export { router };
