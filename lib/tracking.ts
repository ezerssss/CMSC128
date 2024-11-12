import { BoardStatusEnum } from "@/app/enums/board";
import { TrackingStatusEnum } from "@/app/enums/tracking";
import { TrackingHistoryType } from "@/app/types/server/item";
import { Timestamp } from "firebase-admin/firestore";

export function generateTrackingStatusFromBoard(
  boardStatus: BoardStatusEnum
): TrackingHistoryType {
  const history: TrackingHistoryType = [];

  switch (boardStatus) {
    case BoardStatusEnum.DONE:
      history.unshift({
        trackingStatus: TrackingStatusEnum.DONE,
        message:
          "The customer has picked up their laundry, and the order is complete.",
        date: Timestamp.now(),
      });

    case BoardStatusEnum.WAITING_FOR_CUSTOMER:
      history.unshift({
        trackingStatus: TrackingStatusEnum.WAITING_FOR_PICKUP,
        message:
          "The laundry is ready and waiting to be picked up by the customer.",
        date: Timestamp.now(),
      });

    case BoardStatusEnum.IN_PROGRESS:
    case BoardStatusEnum.TO_BE_DELIVERED:
      history.unshift({
        trackingStatus: TrackingStatusEnum.IN_PROGRESS,
        message: "The laundry is currently being washed, dried, or ironed.",
        date: Timestamp.now(),
      });

    case BoardStatusEnum.TO_BE_PICKED_UP:
    case BoardStatusEnum.IDLE:
      history.unshift({
        trackingStatus: TrackingStatusEnum.CONFIRMED_ORDER,
        message: "The laundry order has been successfully placed.",
        date: Timestamp.now(),
      });
  }

  return history;
}
