import { NextFunction, Request, Response } from "express";

export interface IHeader {
  customHeader: (req: Request, res: Response, next: NextFunction) => void;
}
