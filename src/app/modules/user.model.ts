/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from "bcrypt";
import config from "../config";
import { Schema, model } from "mongoose";
import {
  IAddress,
  IFullName,
  IOrder,
  IUser,
  UserModel,
} from "./users/user.interface";

const IFullNameSchema = new Schema<IFullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const IAddressSchema = new Schema<IAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

export const IOrderSchema = new Schema<IOrder>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const UserSchema = new Schema<IUser, UserModel>({
  userId: {
    type: Number,
    required: [true, "User ID is required"],
    unique: true,
  },
  userName: {
    type: String,
    required: [true, "User name is required"],
    unique: true,
  },
  password: { type: String, required: [true, "Password is required"] },
  fullName: {
    type: IFullNameSchema,
    required: [true, "Full Name is required"],
  },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: [{ type: String, required: true }],
  address: { type: IAddressSchema, required: true },
  orders: [{ type: IOrderSchema }],
  isDeleted: { type: Boolean, required: true },
});

// Pre save moddleware/hook
UserSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcryptSaltRounds),
  );
  next();
});

// Post save moddleware/hook
UserSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

UserSchema.statics.isUserExists = async (userId: string) => {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

export const User = model<IUser, UserModel>("User", UserSchema);
