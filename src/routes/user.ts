import express from "express";

import { authMiddleware } from "../middlewares/auth";
import { login, register, user } from "../controllers/user";
import { info } from "../controllers/dataSeed";
import { loggerMiddleware } from "../middlewares/logger";
import { validation } from "../middlewares/validation";
import { loginSchema, registerSchema } from "../utils/userSchema";

const router = express.Router();

router.post("/user/login", validation(loginSchema), login);
router.get("/user", authMiddleware, user);
router.post("/user/info", loggerMiddleware, info);
router.post("/user/register", validation(registerSchema), register);

// middleware chaining

router.post("/user/dashboard", loggerMiddleware, authMiddleware, user);

export { router };
