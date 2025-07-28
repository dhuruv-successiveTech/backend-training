import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { IUser } from "../entities";
import { UserService } from "../services";

class UserController {
  private static instance: UserController;
  private constructor() {}

  public static getInstance(): UserController {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  public user = (
    req: Request & { user?: IUser },
    res: Response,
    next: NextFunction
  ): Response<any, Record<string, any>> | void => {
    try {
      if (req?.user) {
        return res.status(200).json({
          data: req?.user,
          message: "User Data",
        });
      } else {
        return res.status(403).json({
          message: "Access Denied",
        });
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  public login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | void> => {
    try {
      const { userName, password } = req?.body;
      const isExist = await UserService.findUser(userName);
      if (!isExist) {
        res.status(404).json({ message: "user not found" });
        return;
      }

      const valid = await bcrypt.compare(password, isExist?.password);
      if (!valid) {
        return res.status(400).json({ message: "password does not match" });
      }

      const token = jwt.sign(
        { userName, authType: isExist.authType, id:isExist._id},
        config.secretKey,
        {
          expiresIn: "5h",
        }
      );
      return res.status(200).json({ message: "user logged in", token });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  public register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | void> => {
    try {
      const { userName } = req.body;
      const isExist = await UserService.findUser(userName);
      if (isExist) {
        res.status(400).json({ message: "user already exists" });
        return;
      }
      const userPost = await UserService.userRegister(req?.body);

      res.status(201).json({
        success: true,
        message: "user registered successfully",
        user: userPost,
      });
    } catch (error) {
      throw error;
    }
  };
}

export default UserController.getInstance();
