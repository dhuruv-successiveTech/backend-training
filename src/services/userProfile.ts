import { ProfileInterface } from "../interface";
import { ProfileRepo } from "../repository/profile";

const profile = ProfileRepo.getInstance();

export class UserProfileService {

  private static instance: UserProfileService;

  public static getInstance(): UserProfileService {
    if (!UserProfileService.instance) {
      UserProfileService.instance = new UserProfileService();
    }
    return UserProfileService.instance;
  }

  public async postProfile(data: ProfileInterface):Promise<ProfileInterface> {
    return profile.profileRepo(data);
  }
}
