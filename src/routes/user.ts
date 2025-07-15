import express from "express";

import { authMiddleware } from "../middlewares/auth";
import { login, register, user } from "../controllers/user";
import { dataSeed } from "../controllers/dataSeed";
import { loggerMiddleware } from "../middlewares/logger";

const router = express.Router();

router.post("/login", login);
router.get("/user", authMiddleware, user);
router.post("/data-seed", loggerMiddleware, dataSeed);
router.post("/register", register);

// middleware chaining

router.post("/dashboard", loggerMiddleware, authMiddleware, user);

export { router };
