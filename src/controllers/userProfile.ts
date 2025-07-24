import { NextFunction, Request, Response } from "express";
import { UserProfileService } from "../services/userProfile";
import { UserSchema } from "../utils";

const profileService = UserProfileService.getInstance();
const joiSchema = UserSchema;

class UserProfile {
  private static instance: UserProfile;
  public static getInstance(): UserProfile {
    if (!UserProfile.instance) {
      UserProfile.instance = new UserProfile();
    }
    return UserProfile.instance;
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
    const data = await profileService.postProfile(req.body);
    return res.json({
      message: "data saved",
      data: data,
    });
  }
}

export default UserProfile.getInstance();