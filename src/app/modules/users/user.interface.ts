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

// User interface
export type IUser = {
  userId: number;
  userName: string;
  password: string;
  fullName: IFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: IAddress;
  orders?: IOrder[];
  isDeleted: boolean;
};

// For update user
export interface IUserUpdate {
  userId: number;
  username?: string;
  fullName?: {
    firstName?: string;
    lastName?: string;
  };
  age?: number;
  email?: string;
  isActive?: boolean;
  hobbies?: string[];
  address?: {
    street?: string;
    city?: string;
    country?: string;
  };
}

export interface UserModel extends Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: number): Promise<IUser | null>;
}
