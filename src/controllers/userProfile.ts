import { Request, Response } from "express";
import { UserProfileService } from "../services";

class UserProfile {
  private static instance: UserProfile;
  public static getInstance(): UserProfile {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  public async userProfileController(req: Request, res: Response) {
    try {
      const data = await UserProfileService.postProfile(req.body);
      return res.json({
        message: "data saved",
        data: data,
      });
    } catch (error) {
      throw error;
    }
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
