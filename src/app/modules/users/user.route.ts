import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.get("/", userController.getAllUsers);
router.put("/:userId", userController.updateUser);
router.delete("/:userId", userController.deleteUser);
router.get("/:userId", userController.getSingleUser);
router.post("/create-user", userController.createUser);
router.get("/:userId/orders", userController.getOrders);
router.put("/:userId/orders", userController.addNewOrder);
router.get("/:userId/orders/total-price", userController.getTotalOrderPrice);

export const UserRoutes = router;
