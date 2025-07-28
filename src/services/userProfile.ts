import { ProfileInterface } from "../interface";
import { ProfileRepo } from "../repository";

class UserProfileService {

  private static instance: UserProfileService;

  public static getInstance(): UserProfileService {
    if (!UserProfileService.instance) {
      UserProfileService.instance = new UserProfileService();
    }
    return UserProfileService.instance;
  }

  public async postProfile(data: ProfileInterface):Promise<ProfileInterface> {
    return ProfileRepo.profileRepo(data);
  }

   public async getUserProfile():Promise<ProfileInterface[]> {
    return ProfileRepo.getUserRepo();
  }
  
}

export default UserProfileService.getInstance()