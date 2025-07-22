import { NextFunction, Request, response, Response } from "express";
import { getData, userData } from "../services/user";

const create = async (req: Request, res: Response, next: NextFunction) => {
  const data = await userData(req.body);
  return res.json({
    message: "data saved",
    data: data,
  });
};

const get = async (req: Request, res: Response, next: NextFunction) => {
  const data = await getData();
  return res.json({
    message: "data saved",
    data: data,
  });
};

export { create, get };
