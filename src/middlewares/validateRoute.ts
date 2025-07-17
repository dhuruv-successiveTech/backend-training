import Joi from "joi";
import { validationRules } from "../config/validation";
import { NextFunction, Request, Response } from "express";


export const valiationRoute = (req: Request, res: Response, next: NextFunction) => {
  const route = req.originalUrl;

  const reqMethod = req.method.toLowerCase();

  const rules = validationRules[route];
  
  if (!rules) {
    next();
  }

  const schema = rules[reqMethod as 'post' | 'get'] || {};
  
  if (schema.body) {    
    
    const { error } = schema.body.validate(req.body);
    if (error) {
      return next(error);
    }
  }

  if (schema.params) {
    const { error } = schema.params.validate(req.params);
    if (error) {
      return next(error);
    }
  }

  if (schema.query) {
    const { error } = schema.query.validate(req.query);
    if(error){
        return next(error)
    }
  }
  next();
};
