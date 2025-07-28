import { IProfile } from "../entities";
import { profiles } from "../models";

class ProfileRepo {
  private static instance: ProfileRepo;

  public static getInstance(): ProfileRepo {
    if (!ProfileRepo.instance) {
      ProfileRepo.instance = new ProfileRepo();
    }
    return ProfileRepo.instance;
  }

  public async profileRepo(body: IProfile): Promise<IProfile>{
    const data = await profiles.create(body);

    return data;
  }
  public async getUserRepo(): Promise<IProfile[]> {
    const data = await profiles.find({});

    return data;
  }
}

export default ProfileRepo.getInstance();
