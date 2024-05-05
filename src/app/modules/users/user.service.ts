import { User } from "../user.model";
import { IUser } from "./user.interface";

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
        userName: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
      },
    },
  ]);
  return result;
};

const getSingleUserFronDB = async (userId: string) => {
  const result = await User.findOne(
    { userId },
    { _id: 0, password: 0, isDeleted: 0, __v: 0 },
  );
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFronDB,
  getSingleUserFronDB,
};
