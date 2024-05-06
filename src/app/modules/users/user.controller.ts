/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { UserServices } from "./user.service";
import {
  ZOrderSchema,
  ZUserSchema,
  ZUserUpdateSchema,
} from "./user.validation";

// Create user
const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    // Data validation using zod
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
      message: err.length > 0 ? err : "Failed to create user",
      error: {
        code: 404,
        description: "Failed to create user",
      },
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

// Get single user
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getSingleUserFromDB(userId);

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

// Get orders
const getOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getOrdersFromDB(userId);

    if (result?.orders?.length === 0) {
      res.status(404).json({
        success: false,
        message: "Orders not found",
        error: {
          code: 404,
          description: "Orders not found!",
        },
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
      data: result?.orders,
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
    if (err.code === 11000 && err.keyPattern && err.keyValue) {
      const fieldName = Object.keys(err.keyPattern)[0];
      const fieldValue = err.keyValue[fieldName];
      const errMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} "${fieldValue}" already exists.`;

      res.status(500).json({
        success: false,
        message: errMessage,
        error: {
          code: 404,
          description: "Failed to update user",
        },
      });
    } else {
      res.status(500).json({
        success: false,
        message: err.message || "User not found!",
        error: {
          code: 404,
          description: "Failed to update user",
        },
      });
    }
  }
};

// Add new order
const addNewOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const order = req.body;

    const ZParsedData = ZOrderSchema.parse(order);

    // Check if order field is present and it's an object
    if (!order || typeof order !== "object") {
      throw new Error("Invalid or missing order data");
    }

    await UserServices.addNewOrderToDB(parseInt(userId), ZParsedData);

    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Failed to add new order",
      error: {
        code: 404,
        description: "User not found or invalid request data",
      },
    });
  }
};

//Delete user
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    await UserServices.deleteUserFromDB(parseInt(userId));
    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err || "Failed to delete user!",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

// Get total price of orders
const getTotalOrderPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const totalPrice = await UserServices.getUserOrdersTotalPrice(
      parseInt(userId),
    );

    res.status(200).json({
      success: true,
      message: "Total price calculated successfully!",
      data: {
        totalPrice,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to calculate total price",
      error: {
        code: 404,
        description: "User not found",
      },
    });
  }
};

export const userController = {
  getOrders,
  deleteUser,
  createUser,
  updateUser,
  addNewOrder,
  getAllUsers,
  getSingleUser,
  getTotalOrderPrice,
};
