import { NextFunction, Request, Response } from "express";
import { UserProfileService } from "../services/userProfile";

const profile = UserProfileService.getInstance();

export class UserProfile {
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
    const data = await profile.postProfile(req.body);
    return res.json({
      message: "data saved",
      data: data,
    });
  }
}
