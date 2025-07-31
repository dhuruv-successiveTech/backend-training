import { IProfile } from "../entities";
import { ProfileRepo } from "../repository";

class UserProfileService {

  private static instance: UserProfileService;

  public static getInstance(): UserProfileService {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  public async postProfile(data: IProfile):Promise<IProfile> {
    try {
      return ProfileRepo.profileRepo(data);
    } catch (error) {
      throw error
    }
  }

   public async getUserProfile():Promise<IProfile[]> {
    return ProfileRepo.getUserRepo();
  }
  
}

export default UserProfileService.getInstance()