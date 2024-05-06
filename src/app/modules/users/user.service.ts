import { User } from "../user.model";
import { IOrder, IUser, IUserUpdate } from "./user.interface";

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
  const result = await User.findOne({ userId }, { _id: 0, __v: 0 });
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

const addNewOrderToDB = async (userId: number, orders: IOrder) => {
  const existingUser = await User.findOne({ userId });
  if (!existingUser) {
    throw new Error("User Not found!");
  }

  if (!existingUser.orders) {
    existingUser.orders = [orders];
  } else {
    existingUser.orders.push(orders);
  }

  await existingUser.save();
  return orders;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFronDB,
  getSingleUserFromDB,
  upadateUserFromDB,
  getOrdersFromDB,
  addNewOrderToDB,
};
