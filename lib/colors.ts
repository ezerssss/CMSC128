import { BoardStatusEnum } from "@/app/enums/board";
import { PaymentStatusEnum } from "@/app/enums/payment";

export const getBadgeColor = (status: BoardStatusEnum | PaymentStatusEnum) => {
  switch (status) {
    case BoardStatusEnum.IDLE:
    case BoardStatusEnum.TO_BE_PICKED_UP:
    case PaymentStatusEnum.UNPAID:
      return "bg-red-100 text-red-700";
    case BoardStatusEnum.IN_PROGRESS:
    case BoardStatusEnum.TO_BE_DELIVERED:
    case BoardStatusEnum.WAITING_FOR_CUSTOMER:
      return "bg-blue-100 text-blue-700";
    case BoardStatusEnum.DONE:
    case PaymentStatusEnum.PAID:
      return "bg-green-100 text-green-700";
  }
};
