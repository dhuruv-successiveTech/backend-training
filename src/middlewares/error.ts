import { NextFunction, Request, Response } from "express";

interface ErrorInterface {
  statusCode: number;
}
export class ApiError extends Error {
  public static error = (
    err: Error & ErrorInterface,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const status = err.statusCode || 500;
    return res.status(status).json({
      message: err.message,
      status: false,
    });
  };
}
