import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { QueryValidationInterface } from "../interface";

const querySchema = Joi.number().required();

export class QueryValidation implements QueryValidationInterface {
  private static instance: QueryValidation;

  public static getInstance(): QueryValidation {
    if (!QueryValidation.instance) {
      QueryValidation.instance = new QueryValidation();
    }
    return QueryValidation.instance;
  }

  public queryValidator = (req: Request, res: Response, next: NextFunction) => {
    const param = req.params.id;
    const { error } = querySchema.validate(param);
    if (req.params.id && error) {
      next(error);
    } else {
      next();
    }
  };
}
