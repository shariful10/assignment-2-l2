import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:userId", userController.getSingleUser);
router.post("/create-user", userController.createUser);

export const UserRoutes = router;
