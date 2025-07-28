import { NextFunction, Request, Response } from "express";
import { UserProfileService } from "../services";
import { UserSchema } from "../utils";

const joiSchema = UserSchema;

class UserProfile {
  private static instance: UserProfile;
  public static getInstance(): UserProfile {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  public async userProfileController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { error } = joiSchema.profileSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    const data = await UserProfileService.postProfile(req.body);
    return res.json({
      message: "data saved",
      data: data,
    });
  }

  public async getUsers(req: Request, res: Response, next: NextFunction) {
    const data = await UserProfileService.getUserProfile();
    return res.json({
      message: "data saved",
      data: data,
    });
  }
}

export default UserProfile.getInstance();
