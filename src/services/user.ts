import { user } from "../models/user";

interface requestInterface {
  name: string;
  email: string;
  age: number;
  hobbies?:[],
  address: {
    city: string;
    zip: number;
  };
}

const userData = async (body:requestInterface) => {
  const data = new user(body);
  await data.save();
  return data;
};

const getData = async () => {
  const data = await user.find();
  console.log(data);
  
  return data;
};

export { userData,getData };
