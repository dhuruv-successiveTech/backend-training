import { NextFunction, Request, Response } from "express";
import { dataSeedFunction } from "../services/userData";

const dataSeed = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.socket.remoteAddress);
    
    const data = dataSeedFunction();
    res.json({
      message: "data seed api",
      data,
    });
  } catch (error) {
    next(error);
  }
};
export { dataSeed };
