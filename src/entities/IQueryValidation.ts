import { NextFunction, Request, Response } from "express";

export interface IQueryValidation{
    queryValidator : (req: Request, res: Response, next: NextFunction)=>void
}