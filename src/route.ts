import express from "express";
import { errorRoute, userRoute } from "./routes";
import { HealthCheck } from "./controllers/healthCheck";
const router = express.Router();
const healthCheck = HealthCheck.getInstance();


router.use("/user", userRoute);

router.use("/error", errorRoute);

router.use("/health-check",healthCheck.healthCheckController)

export { router };
