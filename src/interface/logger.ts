import { NextFunction, Request, Response } from "express";

export interface LoggerInterface {
  loggerMiddleware: (req: Request, res: Response, next: NextFunction) => void;
}
