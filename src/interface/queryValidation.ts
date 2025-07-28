import { NextFunction, Request, Response } from "express";

export interface QueryValidationInterface{
    queryValidator : (req: Request, res: Response, next: NextFunction)=>void
}