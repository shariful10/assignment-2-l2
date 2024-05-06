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

export const ZOrderSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

export const ZUserSchema = z.object({
  userId: z.number(),
  userName: z
    .string()
    .max(10, { message: "Username can not be more than 10 caracters" }),
  password: z
    .string()
    .min(6, { message: "Password must be more than 6 caracters" })
    .max(20, { message: "Username can not be more than 20 caracters" }),
  fullName: ZFullNameSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: ZAddressSchema,
});

// a separate validation for update user
export const ZUserUpdateSchema = z.object({
  userId: z.number(),
  userName: z.string(),
  fullName: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
  age: z.number(),
  email: z.string(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
  }),
  orders: z.array(ZOrderSchema).optional(),
});
