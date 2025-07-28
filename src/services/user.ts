import { IUser } from "../entities";
import { UserRepo } from "../repository";

class UserService {
  private static instance: UserService;

  public static getInstance(): UserService {
    if (!this.instance) {
      this.instance = new UserService();
    }
    return this.instance;
  }

  public async userRegister(body: IUser): Promise<IUser> {
    return await UserRepo.RegisterRepo(body);
  }

  public async findUser(userName: string): Promise<IUser | null> {
    return await UserRepo.GetUserRepo(userName);
  }
}

export default UserService.getInstance();