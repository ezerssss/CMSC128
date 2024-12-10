import serverDb from "@/app/firebase/serverDB";
import { UserDataType } from "@/app/types/server/auth";
import { DeleteOrderRequestSchema } from "@/app/types/server/item";
import { getErrorMessage } from "@/lib/error";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { data, error } = DeleteOrderRequestSchema.safeParse(body);

  if (error) {
    console.error(error);
    return NextResponse.json(
      { message: error.message },
      { status: StatusCodes.BAD_REQUEST, statusText: error.message }
    );
  }

  const { shopID, orderID, userID } = data;

  try {
    // Check if user actually exists
    const usersCollectionRef = serverDb.collection("users");
    const userDocRef = usersCollectionRef.doc(userID);
    const user = await userDocRef.get();

    if (!user.exists) {
      return NextResponse.json(
        { message: "User not found" },
        { status: StatusCodes.NOT_FOUND, statusText: "User not found" }
      );
    }

    const userData = user.data() as UserDataType;

    // Verify if shopID is actually the user's shop
    if (userData.shopID !== data.shopID) {
      return NextResponse.json(
        { message: "Shop ID doesn't match" },
        { status: StatusCodes.BAD_REQUEST, statusText: "Shop ID doesn't match" }
      );
    }

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

    await orderDocRef.delete();

    return NextResponse.json(
      { message: "Successfully deleted order." },
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
