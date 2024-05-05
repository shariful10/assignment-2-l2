/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { UserServices } from "./user.service";
import { ZUserSchema } from "./user.validation";

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
      message: "Users fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: {
        code: 404,
        description: "Users not found!",
      },
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getSingleUserFronDB(userId);
    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
};
