import express from "express";

import { authMiddleware } from "../middlewares";
import { login, register, user } from "../controllers";
import { info } from "../controllers";
import {
  loggerMiddleware,
  geoLocation,
  queryValidator,
  validation,
} from "../middlewares";
import { loginSchema, registerSchema } from "../utils";

import Joi from "joi";

const userRoute = express.Router();

userRoute.post("/login", validation(loginSchema), login);
userRoute.get("/", authMiddleware, user);
userRoute.post("/info", loggerMiddleware, info);
userRoute.post("/register", validation(registerSchema), register);

// middleware chaining

userRoute.post("/dashboard", loggerMiddleware, authMiddleware, user);
userRoute.post("/info/:id", queryValidator, geoLocation("IN"), info);

// request with parameter

const userDetails = Joi.object({
  name: Joi.string().min(2).required(),
  age: Joi.number().integer().min(18).max(80).required(),
  email: Joi.string().email().required(),
});

userRoute.post("/details", (req, res, next) => {
  const { error } = userDetails.validate(req.body);
  if (req.body) {
    if (error) {
      next(error);
    } else {
      return res.json({
        message: "User details received successfully",
        user: req.body,
      });
    }
  } else {
    next(new Error("req.body not found"));
  }
});

export { userRoute };
