"use client";

import React, { useState, useEffect } from "react";
import "@/app/tracker/tracker.css";
import { ShoppingCart, Settings, Package, Check } from "lucide-react";
import { TrackingStatusEnum } from "@/app/enums/tracking";
import { getTrackingStatusMessage } from "@/lib/tracking";
import { doc, onSnapshot } from "firebase/firestore";
import clientDb from "@/app/firebase/clientDB";


const icons = {
  [TrackingStatusEnum.CONFIRMED_ORDER]: <ShoppingCart size={43} />,
  [TrackingStatusEnum.IN_PROGRESS]: <Settings size={46} />,
  [TrackingStatusEnum.WAITING_FOR_PICKUP]: <Package size={48} />,
  [TrackingStatusEnum.DONE]: <Check size={50} />,
};

export default function Tracker() {
  const query = new URLSearchParams(window.location.search);
  const orderID = query.get('orderID');
  const shopID = query.get('shopID');
  
  const [currentStatus, setCurrentStatus] = useState<TrackingStatusEnum>();
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
    <div className="flex flex-col items-center h-screen bg-gradient-to-br from-[#A6D3EF] to-[#EFF5FF]">
      <div className="flex gap-[500px] fixed left-[80px] mt-[30px]">
        <div>
          <p className="font-bold text-center text-[50px] text-[#173563] mb-5">Tracking Order</p>
          <p className="font-normal bg-white text-[20px] text-center text-[#173563] p-[10px] rounded-[10px] shadow-2xl">
            <strong>{orderID}</strong>
          </p>
        </div>

        <div className="text-left overflow-y-auto mt-[30px]">
          {orderHistory.length > 0 ? (
            orderHistory.map((order, index) => (
              <div key={index} className="relative flex">
                <div className={`bullet ${statusArray.indexOf(order.status) <= statusArray.indexOf(currentStatus) ? "active" : ""}`}></div>
                {index < orderHistory.length - 1 && <div className="line"></div>}
                <div>
                  <p className="font-normal text-[12.5px] text-[#173563]">
                    <strong>{order.status}</strong> - {order.message}
                  </p>
                  <p className="font-normal text-[12.5px] text-[#173563] mb-5">
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

      <div className="fixed bottom-[290px] flex justify-between mt-[20px]">
        {statusArray.map((status, index) => (
          <div key={index} className={`status-line ${currentStatus === status ? "active" : ""} ${statusArray.indexOf(status) < statusArray.indexOf(currentStatus) || complete ? "complete" : ""}`}>
            <div className="status">{icons[status]}</div>
            <p className="font-bold text-[13px] text-[#173563]">{status}</p>
          </div>
        ))}
      </div>

      <img src="/images/tracker/basket.png" alt="Basket" className="w-[1300px] fixed top-[485px] items-center" />
    </div>
  );
}
