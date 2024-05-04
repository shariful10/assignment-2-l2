import { User } from "../user.model";
import { IUser } from "./user.interface";

const createUserIntoDB = async (userData: IUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error("User already exist");
  }
  const result = await User.create(userData);
  return result;
};

export const UserService = {
  createUserIntoDB,
};
