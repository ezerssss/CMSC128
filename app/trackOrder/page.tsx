"use client";

import Link from "next/link";
import React from "react";

export default function TrackOrder() {
  const orderID = 'RLtL94ESxZsWYqPrkKx0'; 
  const shopID = 'DZVmqe5CxaFwZf6WP56j';

  return (
    <div className="h-full w-screen p-5 mt-8 text-center">
      <h1 className="font-bold text-[40px]">Track Your Order</h1>
      <Link
          href={`/tracker?shopID=${shopID}&orderID=${orderID}`}>
          Order ID: <span className="font-bold text-[#173563] text-[20px] underline">{orderID}</span>
      </Link>
    </div>
  );
}
