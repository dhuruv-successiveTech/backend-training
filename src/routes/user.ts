import express from "express";

import { UserController, UserInfo } from "../controllers";
import {
  Logger,
  Validate,
  QueryValidation,
  Location,
  Auth,
} from "../middlewares";
import { UserSchema } from "../utils";
import Joi from "joi";
import { UserProfile } from "../controllers/userProfile";


const userRoute = express.Router();
const userController = UserController.getInstance();
const auth = Auth.getInstance();
const location = Location.getInstance();
const logger = Logger.getInstance();
const queryValidation = QueryValidation.getInstance();
const validate = Validate.getInstance();
const userSchema = UserSchema.getInstance();
const profile = UserProfile.getInstance()

userRoute.post(
  "/login",
  validate.validation(userSchema.loginSchema),
  userController.login.bind(userController)
);

userRoute.get("/", auth.authMiddleware.bind(auth), userController.user);

userRoute.post("/info", logger.loggerMiddleware, UserInfo.info);
userRoute.post(
  "/register",
  validate.validation(userSchema.registerSchema),
  userController.register.bind(userController)
  //The .bind(userController) ensures that this inside the register method refers to the instance of UserController.
);

// middleware chaining

userRoute.post(
  "/dashboard",
  logger.loggerMiddleware,
  auth.authMiddleware.bind(auth),
  userController.user.bind(userController)
);
userRoute.post(
  "/info/:id",
  queryValidation.queryValidator,
  location.geoLocation("IN"),
  UserInfo.info
);

userRoute.post(
  "/profile",
  profile.userProfileController
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
