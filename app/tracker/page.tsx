"use client";

import React, { Suspense } from "react";
import "@/app/tracker/tracker.css";
import {
  ShoppingCart,
  Settings,
  Package,
  Check,
  XCircleIcon,
} from "lucide-react";
import { TrackingStatusEnum } from "@/app/enums/tracking";
import CustomerInfo from "@/components/tracker/CustomerInfo";
import TrackingHistory from "@/components/tracker/TrackingHistory";
import useTracking from "../hooks/useTracking";
import { PuffLoader } from "react-spinners";

const statusArray = Object.values(TrackingStatusEnum);

const icons = {
  [TrackingStatusEnum.CONFIRMED_ORDER]: <ShoppingCart size={43} />,
  [TrackingStatusEnum.IN_PROGRESS]: <Settings size={46} />,
  [TrackingStatusEnum.WAITING_FOR_PICKUP]: <Package size={48} />,
  [TrackingStatusEnum.DONE]: <Check size={50} />,
};

function TrackerContent() {
  const { order, isLoading, isEmpty } = useTracking();
  console.log(isLoading, isEmpty);

  if (isLoading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-[#A6D3EF] to-[#EFF5FF]">
        <PuffLoader color="white" />
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#A6D3EF] to-[#EFF5FF]">
        <XCircleIcon size={100} color="red" />
        <p className="text-2xl">Order doesn't exist</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col items-center bg-gradient-to-br from-[#A6D3EF] to-[#EFF5FF]">
      <div className="fixed left-[80px] top-[30px]">
        <p className="mb-5 text-center text-[50px] font-bold text-[#173563]">
          Tracking Order
        </p>
        {order?.orderID && (
          <p className="rounded-[10px] bg-white p-[10px] text-center text-[20px] font-normal text-[#173563] shadow-2xl">
            <strong>{order.orderID}</strong>
          </p>
        )}
        <CustomerInfo order={order} />
      </div>

      <TrackingHistory order={order} />

      <div className="fixed bottom-[290px] mt-[20px] flex justify-between">
        {statusArray.map((status, index) => (
          <div
            key={status}
            className={`status-line ${order && index < order.trackingHistory.length && "active"}`}
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

export default function Tracker() {
  return (
    <Suspense>
      <TrackerContent />
    </Suspense>
  );
}
