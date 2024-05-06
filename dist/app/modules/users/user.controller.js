"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("./user.service");
const user_validation_1 = require("./user.validation");
// Create user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        // Data validation using zod
        const ZParsedData = user_validation_1.ZUserSchema.parse(user);
        const result = yield user_service_1.UserServices.createUserIntoDB(ZParsedData);
        res.status(200).json({
            success: true,
            message: "User created successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.length > 0 ? err : "Failed to create user",
            error: {
                code: 404,
                description: "Failed to create user",
            },
        });
    }
});
// Get all users
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.UserServices.getAllUserFronDB();
        res.status(200).json({
            success: true,
            message: "Users fetched successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong",
            error: {
                code: 404,
                description: "Users not found!",
            },
        });
    }
});
// Get single user
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.UserServices.getSingleUserFromDB(userId);
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
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!",
            },
        });
    }
});
// Get orders
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { userId } = req.params;
        const result = yield user_service_1.UserServices.getOrdersFromDB(userId);
        if (((_a = result === null || result === void 0 ? void 0 : result.orders) === null || _a === void 0 ? void 0 : _a.length) === 0) {
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
            data: result === null || result === void 0 ? void 0 : result.orders,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!",
            },
        });
    }
});
// Update user data
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const updateUser = req.body;
        const ZParsedData = user_validation_1.ZUserUpdateSchema.parse(updateUser);
        // Password field is not allowed
        if ("password" in updateUser) {
            throw new Error("Updating the password field is not allowed");
        }
        const result = yield user_service_1.UserServices.upadateUserFromDB(userId, ZParsedData);
        res.status(200).json({
            success: true,
            message: "User updated successfully!",
            data: result,
        });
    }
    catch (err) {
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
        }
        else {
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
});
// Add new order
const addNewOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const order = req.body;
        const ZParsedData = user_validation_1.ZOrderSchema.parse(order);
        // Check if order field is present and it's an object
        if (!order || typeof order !== "object") {
            throw new Error("Invalid or missing order data");
        }
        yield user_service_1.UserServices.addNewOrderToDB(parseInt(userId), ZParsedData);
        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: null,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Failed to add new order",
            error: {
                code: 404,
                description: "User not found or invalid request data",
            },
        });
    }
});
//Delete user
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        yield user_service_1.UserServices.deleteUserFromDB(parseInt(userId));
        res.status(200).json({
            success: true,
            message: "User deleted successfully!",
            data: null,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err || "Failed to delete user!",
            error: {
                code: 404,
                description: "User not found!",
            },
        });
    }
});
// Get total price of orders
const getTotalOrderPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const totalPrice = yield user_service_1.UserServices.getUserOrdersTotalPrice(parseInt(userId));
        res.status(200).json({
            success: true,
            message: "Total price calculated successfully!",
            data: {
                totalPrice,
            },
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to calculate total price",
            error: {
                code: 404,
                description: "User not found",
            },
        });
    }
});
exports.userController = {
    getOrders,
    deleteUser,
    createUser,
    updateUser,
    addNewOrder,
    getAllUsers,
    getSingleUser,
    getTotalOrderPrice,
};
