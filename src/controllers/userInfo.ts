import { NextFunction, Request, Response } from "express";
import { dataSeedFunction } from "../services/userData";

const info = (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = dataSeedFunction();
    res.json({
      message: "data seed api",
      data,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
export { info };
