import { NextFunction, Request, Response } from "express";
import { IError } from "../entities";

class ApiError implements IError {
  private static instance : ApiError;
  public static getInstance ():ApiError{
    if(!this.instance){
      this.instance = new this()
    }
    return this.instance;
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

export default ApiError.getInstance();
