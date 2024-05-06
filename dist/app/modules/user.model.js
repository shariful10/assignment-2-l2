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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.IOrderSchema = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../config"));
const mongoose_1 = require("mongoose");
const IFullNameSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
});
const IAddressSchema = new mongoose_1.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
});
exports.IOrderSchema = new mongoose_1.Schema({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});
const UserSchema = new mongoose_1.Schema({
    userId: {
        type: Number,
        required: [true, "User ID is required"],
        unique: true,
    },
    userName: {
        type: String,
        required: [true, "User name is required"],
        unique: true,
    },
    password: { type: String, required: [true, "Password is required"] },
    fullName: {
        type: IFullNameSchema,
        required: [true, "Full Name is required"],
    },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    hobbies: [{ type: String, required: true }],
    address: { type: IAddressSchema, required: true },
    orders: [{ type: exports.IOrderSchema }],
});
// Pre save moddleware/hook
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcryptSaltRounds));
        next();
    });
});
// Post save moddleware/hook
UserSchema.post("save", function (doc, next) {
    doc.password = "";
    next();
});
UserSchema.statics.isUserExists = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield exports.User.findOne({ userId });
    return existingUser;
});
exports.User = (0, mongoose_1.model)("User", UserSchema);
