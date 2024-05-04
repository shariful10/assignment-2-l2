/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { ZUserSchema } from "./user.validation";
import { UserService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    // data validation using zod
    const ZParsedData = ZUserSchema.parse(user);
    const result = await UserService.createUserIntoDB(ZParsedData);

    res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const userController = {
  createUser,
};
