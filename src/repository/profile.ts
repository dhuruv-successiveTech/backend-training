import { ProfileInterface } from "../interface";
import { profiles } from "../models";

export class ProfileRepo {
  private static instance: ProfileRepo;

  public static getInstance(): ProfileRepo {
    if (!ProfileRepo.instance) {
      ProfileRepo.instance = new ProfileRepo();
    }
    return ProfileRepo.instance;
  }

  public async profileRepo(body: ProfileInterface): Promise<ProfileInterface>{
    const data = new profiles(body);
    await data.save();
    return data;
  }
}
