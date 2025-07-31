import { IProfile } from "../entities";
import { profiles } from "../models";

class ProfileRepo {
  private static instance: ProfileRepo;

  public static getInstance(): ProfileRepo {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  public async profileRepo(body: IProfile): Promise<IProfile> {
    try {
      const data = await profiles.create(body);
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default ProfileRepo.getInstance();
