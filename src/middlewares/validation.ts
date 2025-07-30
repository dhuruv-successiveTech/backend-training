import { NextFunction, Request, Response } from "express";
import Joi from "joi";
class Validate {
  private static instance: Validate;

  public static getInstance(): Validate {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  public validation = (schema: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({
          message: error.message,
          success: false,
        });
      }
      next();
    };
  };
}

export default Validate.getInstance();
