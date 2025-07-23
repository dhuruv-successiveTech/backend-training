import express from "express";
import { errorRoute, userRoute } from "./routes";
import { countryRoute } from "./routes/countries";

const router = express.Router();

router.use("/user", userRoute);

router.use("/error", errorRoute);

router.use("/countries", countryRoute);

export { router };
