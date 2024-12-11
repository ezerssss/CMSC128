import { OrderType } from "@/app/types/client/item";
import { formatDate, formatTime } from "@/lib/utils";
import React from "react";

interface PropsInterface {
  order?: OrderType;
}

function TrackingHistory(props: PropsInterface) {
  const { order } = props;

  return (
    <div className="fixed right-[80px] top-[58px] overflow-y-auto text-left">
      {order &&
        order.trackingHistory.length > 0 &&
        order.trackingHistory.map((history, index) => {
          const { message, trackingStatus, date } = history;
          const jsDate = date.toDate();
          const dateString = formatDate(jsDate);
          const timeString = formatTime(jsDate);

          return (
            <div key={message} className="relative flex justify-end">
              <div>
                {/* Status Message and Status */}
                <p className="text-right text-[12.5px] font-normal text-[#173563]">
                  {message} - <strong>{trackingStatus}</strong>
                </p>

                {/* Date and Time */}
                <p className="mb-5 text-right text-[12.5px] font-normal text-[#173563]">
                  {dateString} | {timeString}
                </p>
              </div>
              <div className="ml-5 flex flex-col items-center">
                <div className="bullet active"></div>
                {index < order.trackingHistory.length - 1 && (
                  <div className="line"></div>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default TrackingHistory;
