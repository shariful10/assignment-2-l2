import { User } from "../user.model";
import { IUser, IUserUpdate } from "./user.interface";

const createUserIntoDB = async (userData: IUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error("User already exist");
  }
  const result = await User.create(userData);
  return result;
};

const getAllUserFronDB = async () => {
  const result = await User.aggregate([
    {
      $project: {
        _id: 0,
      },
    },
  ]);
  return result;
};

const getSingleUserFromDB = async (userId: string) => {
  const result = await User.findOne(
    { userId },
    { _id: 0, password: 0, isDeleted: 0, __v: 0 },
  );
  return result;
};

const getOrdersFromDB = async (userId: string) => {
  const result = await User.findOne(
    { userId },
    {
      _id: 0,
      __v: 0,
      age: 0,
      email: 0,
      userId: 0,
      address: 0,
      hobbies: 0,
      isActive: 0,
      userName: 0,
      password: 0,
      fullName: 0,
      isDeleted: 0,
    },
  );
  return result;
};

const upadateUserFromDB = async (userId: string, updateUser: IUserUpdate) => {
  const existingUser = await User.isUserExists(parseInt(userId));
  if (!existingUser) {
    throw new Error();
  }

  const result = await User.updateOne({ userId }, { $set: updateUser });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFronDB,
  getSingleUserFromDB,
  upadateUserFromDB,
  getOrdersFromDB,
};
