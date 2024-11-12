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

export function getTrackingStatusMessage(status: TrackingStatusEnum): string {
  switch (status) {
    case TrackingStatusEnum.DONE:
      return "The customer has picked up their laundry, and the order is complete.";
    case TrackingStatusEnum.WAITING_FOR_PICKUP:
      return "The laundry is ready and waiting to be picked up by the customer.";

    case TrackingStatusEnum.IN_PROGRESS:
      return "The laundry is currently being washed, dried, or ironed.";

    case TrackingStatusEnum.CONFIRMED_ORDER:
    default:
      return "The laundry order has been successfully placed.";
  }
}

// THIS FUNCTION JUST SUCKS BRO
export function updateTrackingStatusHistory(
  history: TrackingHistoryType,
  newStatus: BoardStatusEnum
): TrackingHistoryType {
  let updatedHistory = [...history];
  const boardStatusToHistoryIndexMapping = {
    "to-be-picked-up": 0,
    idle: 0,
    "in-progress": 1,
    "to-be-delivered": 1,
    "waiting-for-customer": 2,
    done: 3,
  };

  const trackingStatusByIndex = [
    TrackingStatusEnum.CONFIRMED_ORDER,
    TrackingStatusEnum.IN_PROGRESS,
    TrackingStatusEnum.WAITING_FOR_PICKUP,
    TrackingStatusEnum.DONE,
  ];

  let latestHistoryIndex = updatedHistory.length - 1;
  const newHistoryIndex = boardStatusToHistoryIndexMapping[newStatus];

  // Progress backtracked
  if (latestHistoryIndex > newHistoryIndex) {
    updatedHistory[newHistoryIndex].date = Timestamp.now();
    updatedHistory = updatedHistory.slice(0, newHistoryIndex + 1);
  } else {
    // Add new History
    while (latestHistoryIndex++ < newHistoryIndex) {
      updatedHistory.push({
        trackingStatus: trackingStatusByIndex[latestHistoryIndex],
        message: getTrackingStatusMessage(
          trackingStatusByIndex[latestHistoryIndex]
        ),
        date: Timestamp.now(),
      });
    }
  }

  return updatedHistory;
}
