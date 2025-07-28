import { Types } from "mongoose";

export interface UserInterface {
  _id:Types.ObjectId,
  userName: string;
  email: string;
  mobile: number;
  password: string;
  gender: string;
  authType:string
}