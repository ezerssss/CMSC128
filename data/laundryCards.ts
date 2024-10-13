import { BoardStatusEnum } from "@/app/enums/board";
import { PaymentStatusEnum } from "@/app/enums/payment";
import { LogisticsEnum, ServicesEnum } from "@/app/enums/services";
import { TrackingStatusEnum } from "@/app/enums/tracking";
import { OrderType } from "@/app/types/client/item";
import { Timestamp } from "firebase/firestore";

export const tempLaundryCardData: OrderType[] = [
  {
    orderID: "1",
    shopID: "1",
    name: "Ezra Magbanua",
    address: null,
    services: [ServicesEnum.DRY],
    logistics: LogisticsEnum.PICK_UP,
    bag: "Blue Duffle Bag",
    weight: 7,
    price: 100,
    paymentStatus: PaymentStatusEnum.UNPAID,
    boardStatus: BoardStatusEnum.TO_BE_PICKED_UP,
    trackingStatus: TrackingStatusEnum.CONFIRMED_ORDER,
    dateCreated: Timestamp.now(),
    dateModified: Timestamp.now(),
    dateFinished: null,
  },
];
