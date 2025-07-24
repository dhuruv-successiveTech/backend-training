import { NextFunction, Request, Response } from "express";
import { config } from "../config/config";
import { HeaderInterface } from "../interface/header";
class Header implements HeaderInterface {
  private static instance: Header;
  public static getInstance(): Header {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  public customHeader = (req: Request, res: Response, next: NextFunction) => {
    res.setHeader("custom-header", config.header);
    return next();
  };
}

export default Header.getInstance()
