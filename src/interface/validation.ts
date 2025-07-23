import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export interface ValidationInterface{
    validation(schema: Joi.ObjectSchema) : (req: Request, res: Response, next: NextFunction) => void
} 