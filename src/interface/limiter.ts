import { NextFunction, Request, Response } from "express";

export interface LimiterInterface {
  rateLimiter(
    requestLimit: number,
    timeLimit: number
  ): (req: Request, res: Response, next: NextFunction) => void;
}
