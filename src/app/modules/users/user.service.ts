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
        __v: 0,
        userId: 0,
        orders: 0,
        hobbies: 0,
        password: 0,
        isActive: 0,
        isDeleted: 0,
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

const getUserOrdersTotalPrice = async (userId: number) => {
  const user = await User.findOne({ userId });

  if (!user) {
    throw new Error("User not found");
  }

  if (!user.orders || user.orders.length === 0) {
    return 0;
  }

  // Calculate total price
  const totalPrice =
    user.orders?.reduce(
      (sum, order) => sum + order.price * order.quantity,
      0,
    ) || 0;

  return totalPrice;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFronDB,
  getSingleUserFromDB,
  upadateUserFromDB,
  getOrdersFromDB,
  addNewOrderToDB,
  getUserOrdersTotalPrice,
};
