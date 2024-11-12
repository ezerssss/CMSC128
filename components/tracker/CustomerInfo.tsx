import { OrderType } from "@/app/types/client/item";
import React from "react";

interface PropsInterface {
  order?: OrderType;
}

function CustomerInfo(props: PropsInterface) {
  const { order } = props;

  return (
    <div className="mt-2 w-fit rounded-[10px] p-[10px] text-left text-[#173563]">
      {order && (
        <>
          <p className="text-lg">
            <strong>Customer:</strong> {order?.name}
          </p>
          <p>
            <strong>Payment Status:</strong> {order?.paymentStatus}
          </p>
          <p>
            <strong>Weight:</strong> {order?.weight} kg
          </p>
          <p>
            <strong>Price:</strong> ₱ {order?.price}
          </p>
        </>
      )}
    </div>
  );
}

export default CustomerInfo;
