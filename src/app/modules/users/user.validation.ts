import { z } from "zod";

const ZFullNameSchema = z.object({
  firstName: z
    .string()
    .max(20, { message: "First name can not be more than 20 caracters" }),
  lastName: z
    .string()
    .max(20, { message: "Last name can not be more than 20 caracters" }),
});

const ZAddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

const ZOrderSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

export const ZUserSchema = z.object({
  userId: z
    .number()
    .min(2, { message: "User ID must be more than 2 caracters" })
    .max(10, { message: "Username can not be more than 10 caracters" }),
  userName: z
    .number()
    .max(10, { message: "Username can not be more than 10 caracters" }),
  password: z
    .string()
    .min(6, { message: "Password must be more than 6 caracters" })
    .max(20, { message: "Username can not be more than 20 caracters" }),
  fullName: ZFullNameSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  address: ZAddressSchema,
  hobbies: z.array(z.string()).optional(),
  orders: z.array(ZOrderSchema).optional(),
  isDeleted: z.boolean(),
});
