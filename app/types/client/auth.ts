import { Timestamp } from "firebase/firestore";
import { z } from "zod";

export const SignUpFormSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(6, { message: "Password should not be (6) characters or more" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password should not be (6) characters or more" }),
    laundryShopName: z
      .string()
      .min(1, { message: "Laundry Shop Name should not be empty" }),
    laundryShopImage: z.string().min(1, { message: "Image required" }),
    numMachines: z.coerce.number().positive(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export type SignUpFormType = z.infer<typeof SignUpFormSchema>;

export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password should not be empty" }),
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;

export const UserDataSchema = z.object({
  uid: z.string().min(1),
  shopID: z.string().min(1),
  email: z.string().email(),
  dateCreated: z.instanceof(Timestamp),
});

export type UserDataType = z.infer<typeof UserDataSchema>;
