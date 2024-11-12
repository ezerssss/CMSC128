import serverDb from "@/app/firebase/serverDB";
import { UserDataType } from "@/app/types/server/auth";
import { NewOrderRequestSchema, OrderType } from "@/app/types/server/item";
import { getErrorMessage } from "@/lib/error";
import { generateTrackingStatusFromBoard } from "@/lib/tracking";
import { Timestamp } from "firebase-admin/firestore";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

const usersCollectionRef = serverDb.collection("users");

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { data, error } = NewOrderRequestSchema.safeParse(body);

  if (error) {
    console.error(error);
    return NextResponse.json(
      { message: error.message },
      { status: StatusCodes.BAD_REQUEST, statusText: error.message }
    );
  }

  const { userID, ...orderData } = data;

  try {
    // Check if user actually exists
    const userDocRef = usersCollectionRef.doc(data.userID);
    const user = await userDocRef.get();

    if (!user.exists) {
      return NextResponse.json(
        { message: "User not found" },
        { status: StatusCodes.NOT_FOUND, statusText: "User not found" }
      );
    }

    const userData = user.data() as UserDataType;

    // Verify if shopID is actually the user's shop
    if (userData.shopID != data.shopID) {
      return NextResponse.json(
        { message: "Shop ID doesn't match" },
        { status: StatusCodes.BAD_REQUEST, statusText: "Shop ID doesn't match" }
      );
    }

    // Add new order to database
    const ordersCollectionRef = serverDb
      .collection("shops")
      .doc(userData.shopID)
      .collection("orders");
    const orderDocumentRef = await ordersCollectionRef.add({});
    const orderID = orderDocumentRef.id;

    const history = generateTrackingStatusFromBoard(orderData.boardStatus);

    const newOrder: OrderType = {
      ...orderData,
      orderID,
      shopID: userData.shopID,
      trackingHistory: history,
      dateCreated: Timestamp.now(),
    };

    await orderDocumentRef.set(newOrder);
    return NextResponse.json(
      { message: "Successfully created new order." },
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
