import express from "express";
import { errorRoute, userRoute } from "./routes";

const router = express.Router();

router.use("/user", userRoute);

router.use("/error", errorRoute);

export { router };
