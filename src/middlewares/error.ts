import { NextFunction, Request, Response } from "express";
import { ErrorInterface } from "../interface";

export class ApiError implements ErrorInterface {
  private static instance : ApiError;
  public static getInstance ():ApiError{
    if(!ApiError.instance){
      ApiError.instance = new ApiError()
    }
    return ApiError.instance;
  }
  public error = (
    err: Error & {statusCode: number;},
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const status = err.statusCode || 500;
    return res.status(status).json({
      message: err.message,
      success: false,
    });
  };
}
