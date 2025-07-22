import { NextFunction, Request, Response } from "express";

export interface HeaderInterface {
  customHeader: (req: Request, res: Response, next: NextFunction) => void;
}
