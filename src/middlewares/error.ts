import { NextFunction, Request, Response } from "express";

const error = (
  err: Error & { statusCode: number },
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

export { error };
