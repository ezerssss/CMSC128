import { z } from "zod";
import { LogisticsEnum, ServicesEnum } from "../../enums/services";
import { Timestamp } from "firebase-admin/firestore";
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

export const NewOrderRequestSchema = z.object({
  userID: z.string().min(1),
  shopID: z.string().min(1),
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

export type NewOrderRequestType = z.infer<typeof NewOrderRequestSchema>;

export const UpdateOrderRequestSchema = z.object({
  orderID: z.string().min(1),
  shopID: z.string().min(1),
  newBoardStatus: z.nativeEnum(BoardStatusEnum),
});

export type UpdateOrderRequestType = z.infer<typeof UpdateOrderRequestSchema>;

export const EditOrderRequestSchema = z.object({
  userID: z.string().min(1),
  orderID: z.string().min(1),
  shopID: z.string().min(1),
  orderData: z.object({
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
  }),
});

export type EditOrderRequestType = z.infer<typeof EditOrderRequestSchema>;

export const DeleteOrderRequestSchema = z.object({
  userID: z.string().min(1),
  orderID: z.string().min(1),
  shopID: z.string().min(1),
});

export type DeleteOrderRequestType = z.infer<typeof DeleteOrderRequestSchema>;
