import { NextFunction, Request, Response } from "express";
import { dataSeedFunction } from "../services";

class UserInfo {
  private static instance: UserInfo;
  public static getInstance(): UserInfo {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }
  public info = (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = dataSeedFunction();
      res.json({
        message: "data seed api",
        data,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default UserInfo.getInstance();
