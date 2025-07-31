export interface IProfile {
  name: string;
  email: string;
  age: number;
  hobbies?:string[],
  address?: {
    city?: string | null | undefined;
    zip?: number | null | undefined;
  } | null;
}