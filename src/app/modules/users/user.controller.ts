/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { ZUserSchema } from "./user.validation";
import { UserServices } from "./user.service";

// Creayte all users
const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    // data validation using zod
    const ZParsedData = ZUserSchema.parse(user);
    const result = await UserServices.createUserIntoDB(ZParsedData);

    res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err || "Something went wrong",
    });
  }
};

// Get all users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserFronDB();
    res.status(200).json({
      success: true,
      message: "Users are retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};

export const userController = {
  createUser,
  getAllUsers,
};
