import { BoardStatusEnum } from "../enums/board";
import { ExpenseTypeEnum } from "../enums/expense";
import { PaymentStatusEnum } from "../enums/payment";
import { LogisticsEnum, ServicesEnum } from "../enums/services";

export const LogisticsOptions = [
  { label: LogisticsEnum.DELIVERY, value: LogisticsEnum.DELIVERY },
  { label: LogisticsEnum.PICK_UP, value: LogisticsEnum.PICK_UP },
];

export const ServicesOptions = [
  { label: ServicesEnum.WASH, value: ServicesEnum.WASH },
  { label: ServicesEnum.DRY, value: ServicesEnum.DRY },
  { label: ServicesEnum.FOLD, value: ServicesEnum.FOLD },
];

export const PaymentOptions = [
  { label: PaymentStatusEnum.PAID, value: PaymentStatusEnum.PAID },
  { label: PaymentStatusEnum.UNPAID, value: PaymentStatusEnum.UNPAID },
];

export const ExpenseTypeOptions = [
  { label: ExpenseTypeEnum.LABOR, value: ExpenseTypeEnum.LABOR },
  { label: ExpenseTypeEnum.SUPPLIES, value: ExpenseTypeEnum.SUPPLIES },
  { label: ExpenseTypeEnum.UTILITIES, value: ExpenseTypeEnum.UTILITIES },
];

export const BoardStatusOptions = [
  {
    label: "To be Picked Up",
    value: BoardStatusEnum.TO_BE_PICKED_UP,
  },
  { label: "Idle", value: BoardStatusEnum.IDLE },
  {
    label: "In Progress",
    value: BoardStatusEnum.IN_PROGRESS,
  },
  {
    label: "To be Delivered",
    value: BoardStatusEnum.TO_BE_DELIVERED,
  },
  {
    label: "Waiting for Customer",
    value: BoardStatusEnum.WAITING_FOR_CUSTOMER,
  },
  {
    label: "Done",
    value: BoardStatusEnum.DONE,
  },
];
