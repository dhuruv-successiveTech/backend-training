import express from "express";
import { loginWithToken,registerWithToken } from "../controllers/auth";
import { authMiddleware } from "../middlewares/auth";
import { user } from "../controllers/user";
import { dataSeed } from "../controllers/dataSeed";
import { loggerMiddleware } from "../middlewares/logger";

const router = express.Router();

router.post("/login", loginWithToken);
router.get("/user", authMiddleware, user);
router.post("/data-seed", loggerMiddleware ,dataSeed);
router.post("/register",registerWithToken)

// middleware chaining

router.post('/dashboard',loggerMiddleware,authMiddleware,user)

export { router };
