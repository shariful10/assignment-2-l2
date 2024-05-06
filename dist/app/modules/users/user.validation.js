"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZUserUpdateSchema = exports.ZUserSchema = exports.ZOrderSchema = void 0;
const zod_1 = require("zod");
const ZFullNameSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .max(20, { message: "First name can not be more than 20 caracters" }),
    lastName: zod_1.z
        .string()
        .max(20, { message: "Last name can not be more than 20 caracters" }),
});
const ZAddressSchema = zod_1.z.object({
    street: zod_1.z.string(),
    city: zod_1.z.string(),
    country: zod_1.z.string(),
});
exports.ZOrderSchema = zod_1.z.object({
    productName: zod_1.z.string(),
    price: zod_1.z.number(),
    quantity: zod_1.z.number(),
});
exports.ZUserSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    userName: zod_1.z
        .string()
        .max(10, { message: "Username can not be more than 10 caracters" }),
    password: zod_1.z
        .string()
        .min(6, { message: "Password must be more than 6 caracters" })
        .max(20, { message: "Username can not be more than 20 caracters" }),
    fullName: ZFullNameSchema,
    age: zod_1.z.number(),
    email: zod_1.z.string().email(),
    isActive: zod_1.z.boolean(),
    hobbies: zod_1.z.array(zod_1.z.string()),
    address: ZAddressSchema,
});
// a separate validation for update user
exports.ZUserUpdateSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    userName: zod_1.z.string(),
    fullName: zod_1.z.object({
        firstName: zod_1.z.string(),
        lastName: zod_1.z.string(),
    }),
    age: zod_1.z.number(),
    email: zod_1.z.string(),
    isActive: zod_1.z.boolean(),
    hobbies: zod_1.z.array(zod_1.z.string()),
    address: zod_1.z.object({
        street: zod_1.z.string(),
        city: zod_1.z.string(),
        country: zod_1.z.string(),
    }),
    orders: zod_1.z.array(exports.ZOrderSchema).optional(),
});
