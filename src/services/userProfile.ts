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
    return ProfileRepo.profileRepo(data);
  }
}

export default UserProfileService.getInstance()