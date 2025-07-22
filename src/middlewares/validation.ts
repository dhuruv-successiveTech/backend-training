import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export class Validate {
  public static validation = (schema: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const { error } = schema.validate(req.body);
      if (error) {
        return next(error);
      }
      next();
    };
  };
}
