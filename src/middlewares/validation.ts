import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { ValidationInterface } from "../interface";

export class Validate implements ValidationInterface {
  private static instance: Validate;

  public static getInstance(): Validate {
    if (!Validate.instance) {
      Validate.instance = new Validate();
    }
    return Validate.instance;
  }

  public validation = (schema: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const { error } = schema.validate(req.body);
      if (error) {
        return next(error);
      }
      next();
    };
  };
}
