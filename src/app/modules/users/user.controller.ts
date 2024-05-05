/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { UserServices } from "./user.service";
import { ZUserSchema, ZUserUpdateSchema } from "./user.validation";

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

    if (!result) {
      res.status(404).json({
        success: false,
        message: "Users not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
      return;
    }

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

// Update user data
const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updateUser = req.body;

    const ZParsedData = ZUserUpdateSchema.parse(updateUser);

    // Password field is not allowed
    if ("password" in updateUser) {
      throw new Error("Updating the password field is not allowed");
    }

    const result = await UserServices.upadateUserFromDB(userId, ZParsedData);

    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Failed to update user data",
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
  updateUser,
};
