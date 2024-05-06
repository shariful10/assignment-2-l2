import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.get("/", userController.getAllUsers);
router.put("/:userId", userController.updateUser);
router.get("/:userId", userController.getSingleUser);
router.get("/:userId/orders", userController.getOrders);
router.post("/create-user", userController.createUser);

export const UserRoutes = router;
