import { UserInterface } from "../interface/user";
import bcrypt from "bcrypt";
import { user } from "../models/user";

export class UserRepo {
  private static instance: UserRepo;

  public static getInstance(): UserRepo {
    if (!this.instance) {
      this.instance = new UserRepo();
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
    };

    const userPost = new user(newUser);
    return await userPost.save();
  }

  public async GetUserRepo(body: UserInterface): Promise<UserInterface | null> {
    const { userName } = body;
    const existingUser = await user.findOne({ userName });
    return existingUser;
  }
}
