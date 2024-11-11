"use client";

import React, { useState, useEffect } from "react";
import "@/app/tracker/tracker.css";
import { ShoppingCart, Settings, Package, Check } from "lucide-react";
import { TrackingStatusEnum } from "@/app/enums/tracking";
import { getTrackingStatusMessage } from "@/lib/tracking";
import { doc, onSnapshot } from "firebase/firestore";
import clientDb from "@/app/firebase/clientDB";
import { useSearchParams } from "next/navigation";

const icons = {
  [TrackingStatusEnum.CONFIRMED_ORDER]: <ShoppingCart size={43} />,
  [TrackingStatusEnum.IN_PROGRESS]: <Settings size={46} />,
  [TrackingStatusEnum.WAITING_FOR_PICKUP]: <Package size={48} />,
  [TrackingStatusEnum.DONE]: <Check size={50} />,
};

export default function Tracker() {
  const searchParams = useSearchParams();
  const orderID = searchParams.get("orderID");
  const shopID = searchParams.get("shopID");

  const [currentStatus, setCurrentStatus] = useState<TrackingStatusEnum>(
    TrackingStatusEnum.CONFIRMED_ORDER
  );
  const [complete, setComplete] = useState(false);
  const [orderHistory, setOrderHistory] = useState<any[]>([]);
  const statusArray = Object.values(TrackingStatusEnum);

  useEffect(() => {
    if (!orderID || !shopID) return;

    const orderDocRef = doc(clientDb, "shops", shopID, "orders", orderID);

    const unsub = onSnapshot(orderDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const orderData = docSnapshot.data();
        const updatedStatus = orderData.trackingStatus;
        const dateCreated = orderData.dateCreated.toDate();
        const formattedDate = dateCreated.toLocaleDateString();
        const formattedTime = dateCreated.toLocaleTimeString();

        setCurrentStatus(updatedStatus);
        setOrderHistory((prevHistory) => [
          ...prevHistory,
          {
            status: updatedStatus,
            message: getTrackingStatusMessage(updatedStatus),
            date: formattedDate,
            time: formattedTime,
          },
        ]);

        if (updatedStatus === TrackingStatusEnum.DONE) setComplete(true);
      }
    });

    return () => unsub();
  }, [orderID, shopID]);

  return (
    <div className="flex h-screen flex-col items-center bg-gradient-to-br from-[#A6D3EF] to-[#EFF5FF]">
      <div className="fixed left-[80px] mt-[30px] flex gap-[500px]">
        <div>
          <p className="mb-5 text-center text-[50px] font-bold text-[#173563]">
            Tracking Order
          </p>
          <p className="rounded-[10px] bg-white p-[10px] text-center text-[20px] font-normal text-[#173563] shadow-2xl">
            <strong>{orderID}</strong>
          </p>
        </div>

        <div className="mt-[30px] overflow-y-auto text-left">
          {orderHistory.length > 0 ? (
            orderHistory.map((order, index) => (
              <div key={index} className="relative flex">
                <div
                  className={`bullet ${statusArray.indexOf(order.status) <= statusArray.indexOf(currentStatus) ? "active" : ""}`}
                ></div>
                {index < orderHistory.length - 1 && (
                  <div className="line"></div>
                )}
                <div>
                  <p className="text-[12.5px] font-normal text-[#173563]">
                    <strong>{order.status}</strong> - {order.message}
                  </p>
                  <p className="mb-5 text-[12.5px] font-normal text-[#173563]">
                    {order.date} | {order.time}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-[#173563]">No order history available.</p>
          )}
        </div>
      </div>

      <div className="fixed bottom-[290px] mt-[20px] flex justify-between">
        {statusArray.map((status, index) => (
          <div
            key={index}
            className={`status-line ${currentStatus === status ? "active" : ""} ${statusArray.indexOf(status) < statusArray.indexOf(currentStatus) || complete ? "complete" : ""}`}
          >
            <div className="status">{icons[status]}</div>
            <p className="text-[13px] font-bold text-[#173563]">{status}</p>
          </div>
        ))}
      </div>

      <img
        src="/images/tracker/basket.png"
        alt="Basket"
        className="fixed top-[485px] w-[1300px] items-center"
      />
    </div>
  );
}
