import { Timestamp } from "firebase-admin/firestore";
import { z } from "zod";

export const SignUpRequestSchema = z.object({
  uid: z.string().min(1),
  email: z.string().email(),
  laundryShopName: z.string().min(1),
  laundryShopImage: z.string().min(1, { message: "Image required" }),
  numMachines: z.coerce.number().positive(),
});

export type SignUpRequestType = z.infer<typeof SignUpRequestSchema>;

export const UserDataSchema = z.object({
  uid: z.string().min(1),
  shopID: z.string().min(1),
  email: z.string().email(),
  dateCreated: z.instanceof(Timestamp),
});

export type UserDataType = z.infer<typeof UserDataSchema>;
