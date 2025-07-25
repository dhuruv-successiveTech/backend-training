import { UserInterface } from "../interface";
import bcrypt from "bcrypt";
import { user } from "../models";

class UserRepo {
  private static instance: UserRepo;

  public static getInstance(): UserRepo {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  public async RegisterRepo(body: UserInterface): Promise<UserInterface> {
    const { userName, password, email, gender, mobile } = body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      userName,
      password: hashedPassword,
      email,
      gender,
      mobile,
      authType:"user"
    };

    const userPost = new user(newUser);
    return await userPost.save();
  }

  public async GetUserRepo(userName: string): Promise<UserInterface | null> {

    const existingUser = await user.findOne({ userName });
    return existingUser;
  }
}

export default UserRepo.getInstance();