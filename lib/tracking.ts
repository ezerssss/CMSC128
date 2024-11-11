import { BoardStatusEnum } from "@/app/enums/board";
import { TrackingStatusEnum } from "@/app/enums/tracking";

export function getTrackingStatusFromBoardStatus(
  boardStatus: BoardStatusEnum
): TrackingStatusEnum {
  switch (boardStatus) {
    case BoardStatusEnum.TO_BE_PICKED_UP:
    case BoardStatusEnum.IDLE:
      return TrackingStatusEnum.CONFIRMED_ORDER;
    case BoardStatusEnum.IN_PROGRESS:
    case BoardStatusEnum.TO_BE_DELIVERED:
      return TrackingStatusEnum.IN_PROGRESS;
    case BoardStatusEnum.WAITING_FOR_CUSTOMER:
      return TrackingStatusEnum.WAITING_FOR_PICKUP;
    default:
      return TrackingStatusEnum.DONE;
  }
}

export function getTrackingStatusMessage(
  trackingStatus: TrackingStatusEnum
): string {
  switch (trackingStatus) {
    case TrackingStatusEnum.CONFIRMED_ORDER:
      return "The laundry order has been successfully placed.";
    case TrackingStatusEnum.IN_PROGRESS:
      return "The laundry is currently being washed, dried, or ironed.";
    case TrackingStatusEnum.WAITING_FOR_PICKUP:
      return "The laundry is ready and waiting to be picked up by the customer.";
    default:
      return "The customer has picked up their laundry, and the order is complete.";
  }
}
