import { Model } from "mongoose";

export type IFullName = {
  firstName: string;
  lastName: string;
};

export type IAddress = {
  street: string;
  city: string;
  country: string;
};

export interface IOrder {
  productName: string;
  price: number;
  quantity: number;
}

export type IUser = {
  userId: number;
  userName: string;
  password: string;
  fullName: IFullName;
  age: number;
  email: string;
  isActive: boolean;
  address: IAddress;
  hobbies?: string[];
  orders?: IOrder[];
  isDeleted: boolean;
};

export interface UserModel extends Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: number): Promise<IUser | null>;
}
