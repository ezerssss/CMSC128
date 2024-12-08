import { Timestamp } from "firebase/firestore";
import { z } from "zod";

export const LaundryShopSchema = z.object({
  shopID: z.string().min(1),
  name: z.string().min(1),
  imageURL: z.string().min(1, { message: "Image required" }),
  dateCreated: z.instanceof(Timestamp),
  dateModified: z.instanceof(Timestamp),
});

export type LaundryShopType = z.infer<typeof LaundryShopSchema>;
