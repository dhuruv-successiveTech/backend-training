import { NextFunction, Request, Response } from "express";
import Joi from "joi";
const querySchema = Joi.number().required();

class QueryValidation {
  private static instance: QueryValidation;

  public static getInstance(): QueryValidation {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  public queryValidator = (req: Request, res: Response, next: NextFunction) => {
   
      const param = req?.params?.id;
      const { error } = querySchema.validate(param);
      if (req.params.id && error) {
        throw error;
      } else {
        next();
      }
  };
}

export default QueryValidation.getInstance();
