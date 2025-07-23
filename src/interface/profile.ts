export interface ProfileInterface {
  name: string;
  email: string;
  age: number;
  hobbies?:[],
  address: {
    city: string;
    zip: number;
  };
}