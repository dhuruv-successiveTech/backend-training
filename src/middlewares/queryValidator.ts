import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const querySchema = Joi.number().required();

const queryValidator = (req: Request, res: Response, next: NextFunction) => {
  const param = req.params.id;
  const { error } = querySchema.validate(param);
  if (req.params.id && error) {
    next(error);
  } else {
    next();
  }
};

export { queryValidator };
