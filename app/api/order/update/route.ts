import serverDb from "@/app/firebase/serverDB";
import { OrderType, UpdateOrderRequestSchema } from "@/app/types/server/item";
import { getErrorMessage } from "@/lib/error";
import { updateTrackingStatusHistory } from "@/lib/tracking";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { data, error } = UpdateOrderRequestSchema.safeParse(body);

  if (error) {
    console.error(error);
    return NextResponse.json(
      { message: error.message },
      { status: StatusCodes.BAD_REQUEST, statusText: error.message }
    );
  }

  const { shopID, orderID, newBoardStatus } = data;

  try {
    const shopDocRef = serverDb.collection("shops").doc(shopID);
    const shopDoc = await shopDocRef.get();

    if (!shopDoc.exists) {
      return NextResponse.json(
        { message: "Shop doesn't exist" },
        {
          status: StatusCodes.NOT_FOUND,
          statusText: "Shop doesn't exist",
        }
      );
    }

    const orderDocRef = shopDocRef.collection("orders").doc(orderID);
    const orderDoc = await orderDocRef.get();

    if (!orderDoc.exists) {
      return NextResponse.json(
        { message: "Order doesn't exist" },
        {
          status: StatusCodes.NOT_FOUND,
          statusText: "Order doesn't exist",
        }
      );
    }

    const { trackingHistory } = orderDoc.data() as OrderType;
    const updatedTrackingHistory = updateTrackingStatusHistory(
      trackingHistory,
      newBoardStatus
    );

    await orderDocRef.update({
      boardStatus: newBoardStatus,
      trackingHistory: updatedTrackingHistory,
    });
    return NextResponse.json(
      { message: "Successfully updated order." },
      { status: StatusCodes.OK }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: getErrorMessage(error) },
      {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        statusText: getErrorMessage(error),
      }
    );
  }
}
