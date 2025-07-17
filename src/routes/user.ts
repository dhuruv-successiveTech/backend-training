import express from "express";

import { authMiddleware } from "../middlewares";
import { login, register, user } from "../controllers";
import { info } from "../controllers";
import { loggerMiddleware } from "../middlewares";

const router = express.Router();

router.post("/login", login);
router.get("/", authMiddleware, user);
router.post("/info", loggerMiddleware, info);
router.post("/register", register);

// middleware chaining

router.post("/dashboard", loggerMiddleware, authMiddleware, user);

export { router };
