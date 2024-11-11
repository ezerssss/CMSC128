"use client";

import React, { useState, useEffect } from "react";
import "./Tracker.css";
import { ShoppingCart, Settings, Package, Check } from "lucide-react";
import { generateTrackingNumber, censorName } from "@/lib/utils";

const status = ["Confirmed Order", "In Progress", "Waiting for Pickup", "Done"];

const messages = [
  "The laundry order has been successfully placed.",
  "The laundry is currently being washed, dried, or ironed.",
  "The laundry is ready and waiting to be picked up by the customer.",
  "The customer has picked up their laundry, and the order is complete.",
];

const icons = [
  <ShoppingCart size={43} />,
  <Settings size={46} />,
  <Package size={48} />,
  <Check size={50} />,
];

const paymentStatus = "Paid";

const customerDetails = {
  name: censorName("Joshua Hong"),
  weight: "7kg",
  price: "P80",
};
export default function Tracker() {
  const [currentStatus, setCurrentStatus] = useState(0);
  const [complete, setComplete] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [orderHistory, setOrderHistory] = useState([
    {
      status: status[0],
      message: messages[0],
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    },
  ]);

  useEffect(() => {
    setTrackingNumber(generateTrackingNumber());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentStatus < status.length - 1) {
        setOrderHistory((prevHistory) => [
          ...prevHistory,
          {
            status: status[currentStatus + 1],
            message: messages[currentStatus + 1],
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
          },
        ]);
        setCurrentStatus((prev) => prev + 1);
      } else {
        setComplete(true);
        clearInterval(interval);
      }
    }, 11000);

    return () => clearInterval(interval);
  }, [currentStatus, status, messages]);

  return (
    <div className="flex h-screen flex-col items-center bg-gradient-to-br from-[#A6D3EF] to-[#EFF5FF]">
      <div className="fixed left-[80px] mt-[30px] flex gap-[500px]">
        <div>
          <p className="mb-5 text-center text-[50px] font-bold text-[#173563]">
            Tracking Order
          </p>
          <p className="rounded-[10px] bg-white p-[10px] text-center text-[20px] font-normal text-[#173563] shadow-2xl">
            <strong>{trackingNumber}</strong>
          </p>

          <div className="ml-4 mt-2 w-fit rounded-[10px] p-[10px] text-left text-[#173563]">
            <p className="text-lg">
              <strong>Customer:</strong> {customerDetails.name}
            </p>
            <p>
              <strong>Payment Status:</strong> {paymentStatus}
            </p>
            <p>
              <strong>Weight:</strong> {customerDetails.weight}
            </p>
            <p>
              <strong>Price:</strong> {customerDetails.price}
            </p>
          </div>
        </div>

        <div className="mt-[30px] overflow-y-auto text-left">
          {orderHistory.map((order, index) => (
            <div key={order.message} className="relative flex justify-end">
              <div>
                <p className="text-right text-[12.5px] font-normal text-[#173563]">
                  {order.message} - <strong>{order.status}</strong>
                </p>
                <p className="mb-5 text-right text-[12.5px] font-normal text-[#173563]">
                  {order.date} | {order.time}
                </p>
              </div>
              <div className="ml-5 flex flex-col items-center">
                <div
                  className={`bullet ${index <= currentStatus ? "active" : ""}`}
                ></div>
                {index < orderHistory.length - 1 && (
                  <div className="line"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-[260px] mt-[50px] flex justify-between">
        {status.map((status, index) => (
          <div
            key={index}
            className={`status-line ${currentStatus === index ? "active" : ""} ${index < currentStatus || complete ? "complete" : ""}`}
          >
            <div className="status">{icons[index]}</div>
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
