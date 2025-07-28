import { NextFunction, Request, Response } from "express";

export interface ILogger {
  loggerMiddleware: (req: Request, res: Response, next: NextFunction) => void;
}
