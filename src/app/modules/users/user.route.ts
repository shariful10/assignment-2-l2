import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.get("/", userController.getAllUsers);
router.put("/:userId", userController.updateUser);
router.get("/:userId", userController.getSingleUser);
router.post("/create-user", userController.createUser);
router.get("/:userId/orders", userController.getOrders);
router.put("/:userId/orders", userController.addNewOrder);

export const UserRoutes = router;
