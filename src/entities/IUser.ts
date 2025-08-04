import { Types } from "mongoose";

export interface IUser {
  _id:Types.ObjectId,
  userName: string;
  email: string;
  mobile: number;
  password: string;
  gender: string;
  authType:string
}