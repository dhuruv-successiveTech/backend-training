import { NextFunction, Request, Response } from "express";
import { config } from "../config/config";
import { HeaderInterface } from "../interface/header";
export class Header implements HeaderInterface {
  private static instance: Header;
  public static getInstance(): Header {
    if (!Header.instance) {
      Header.instance = new Header();
    }
    return Header.instance;
  }

  public customHeader = (req: Request, res: Response, next: NextFunction) => {
    res.setHeader("custom-header", config.header);
    next();
  };
}
