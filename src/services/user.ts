import { UserInterface } from "../interface/user";
import { UserRepo } from "../repository";

class UserService {
  private static instance: UserService;

  public static getInstance(): UserService {
    if (!this.instance) {
      this.instance = new UserService();
    }
    return this.instance;
  }

  public async userRegister(body: UserInterface): Promise<UserInterface> {
    return await UserRepo.RegisterRepo(body);
  }

  public async findUser(userName: string): Promise<UserInterface | null> {
    return await UserRepo.GetUserRepo(userName);
  }
}

export default UserService.getInstance();