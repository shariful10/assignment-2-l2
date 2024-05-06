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
exports.UserServices = void 0;
const user_model_1 = require("../user.model");
const createUserIntoDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isUserExists(userData.userId)) {
        throw new Error("User already exist");
    }
    const result = yield user_model_1.User.create(userData);
    return result;
});
const getAllUserFronDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.aggregate([
        {
            $project: {
                _id: 0,
                __v: 0,
                userId: 0,
                orders: 0,
                hobbies: 0,
                password: 0,
                isActive: 0,
                isDeleted: 0,
            },
        },
    ]);
    return result;
});
const getSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ userId }, { _id: 0, password: 0, isDeleted: 0, __v: 0 });
    return result;
});
const getOrdersFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ userId }, { _id: 0, __v: 0 });
    return result;
});
const upadateUserFromDB = (userId, updateUser) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_model_1.User.isUserExists(parseInt(userId));
    if (!existingUser) {
        throw new Error();
    }
    const result = yield user_model_1.User.updateOne({ userId }, { $set: updateUser });
    return result;
});
const addNewOrderToDB = (userId, orders) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_model_1.User.findOne({ userId });
    if (!existingUser) {
        throw new Error("User Not found!");
    }
    if (!existingUser.orders) {
        existingUser.orders = [orders];
    }
    else {
        existingUser.orders.push(orders);
    }
    yield existingUser.save();
    return orders;
});
const getUserOrdersTotalPrice = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield user_model_1.User.findOne({ userId });
    if (!user) {
        throw new Error("User not found");
    }
    if (!user.orders || user.orders.length === 0) {
        return 0;
    }
    // Calculate total price
    const totalPrice = ((_a = user.orders) === null || _a === void 0 ? void 0 : _a.reduce((sum, order) => sum + order.price * order.quantity, 0)) || 0;
    return totalPrice;
});
const deleteUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.deleteOne({ userId });
    return result;
});
exports.UserServices = {
    getOrdersFromDB,
    addNewOrderToDB,
    createUserIntoDB,
    deleteUserFromDB,
    getAllUserFronDB,
    upadateUserFromDB,
    getSingleUserFromDB,
    getUserOrdersTotalPrice,
};
