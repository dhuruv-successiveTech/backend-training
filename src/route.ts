import express from "express";
import { errorRoute, userRoute } from "./routes";

import { HealthCheck } from "./controllers";
const router = express.Router();


router.use("/user", userRoute);

router.use("/error", errorRoute);

router.use("/health-check", HealthCheck.healthCheckController);

export { router };
