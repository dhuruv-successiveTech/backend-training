import express from "express";

import { UserController, UserInfo } from "../controllers";
import {
  Logger,
  Validate,
  QueryValidation,
  Location,
  Auth,
} from "../middlewares";
import { userSchema } from "../utils";
import Joi from "joi";

const userRoute = express.Router();

userRoute.post(
  "/login",
  Validate.validation(userSchema.loginSchema),
  UserController.login
);
userRoute.get("/", Auth.authMiddleware, UserController.user);
userRoute.post("/info", Logger.loggerMiddleware, UserInfo.info);
userRoute.post(
  "/register",
  Validate.validation(userSchema.registerSchema),
  UserController.register
);

// middleware chaining

userRoute.post(
  "/dashboard",
  Logger.loggerMiddleware,
  Auth.authMiddleware,
  UserController.user
);
userRoute.post(
  "/info/:id",
  QueryValidation.queryValidator,
  Location.geoLocation("IN"),
  UserInfo.info
);

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
