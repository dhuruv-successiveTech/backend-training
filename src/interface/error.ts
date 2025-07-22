import { NextFunction, Request, Response } from "express";

export interface ErrorInterface {
  error: (
    err: Error & { statusCode: number },
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
}
