import { z } from "zod";
import { LogisticsEnum, ServicesEnum } from "../../enums/services";
import { Timestamp } from "firebase/firestore";
import { BoardStatusEnum } from "@/app/enums/board";
import { PaymentStatusEnum } from "@/app/enums/payment";
import { TrackingStatusEnum } from "@/app/enums/tracking";

export const TrackingHistorySchema = z
  .object({
    trackingStatus: z.nativeEnum(TrackingStatusEnum),
    message: z.string().min(1),
    date: z.instanceof(Timestamp),
  })
  .array();

export type TrackingHistoryType = z.infer<typeof TrackingHistorySchema>;

export const OrderSchema = z.object({
  orderID: z.string().min(1),
  shopID: z.string().min(1),
  name: z.string().min(1),
  address: z.string().nullable(),
  services: z.nativeEnum(ServicesEnum).array().min(1),
  logistics: z.nativeEnum(LogisticsEnum),
  bag: z.string().min(1),
  weight: z.number().positive(),
  price: z.number().nonnegative(),
  paymentStatus: z.nativeEnum(PaymentStatusEnum),
  boardStatus: z.nativeEnum(BoardStatusEnum),
  trackingHistory: TrackingHistorySchema,
  dateCreated: z.instanceof(Timestamp),
});

export type OrderType = z.infer<typeof OrderSchema>;

export const NewOrderFormSchema = z.object({
  name: z.string().min(1),
  address: z.string(),
  services: z
    .nativeEnum(ServicesEnum)
    .array()
    .min(1, { message: "Select at least one service" }),
  logistics: z.nativeEnum(LogisticsEnum, {
    message: "Select at least one logistic option",
  }),
  bag: z.string().min(1),
  weight: z.coerce.number().positive(),
  price: z.coerce.number().nonnegative(),
  paymentStatus: z.nativeEnum(PaymentStatusEnum),
  boardStatus: z.nativeEnum(BoardStatusEnum),
});

export type NewOrderFormType = z.infer<typeof NewOrderFormSchema>;
