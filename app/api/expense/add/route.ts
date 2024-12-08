import serverDb from "@/app/firebase/serverDB";
import {
  ExpenseType,
  NewExpenseRequestSchema,
} from "@/app/types/server/expense";
import { getErrorMessage } from "@/lib/error";
import { Timestamp } from "firebase-admin/firestore";
import { StatusCodes } from "http-status-codes";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { data, error } = NewExpenseRequestSchema.safeParse(body);

  if (error) {
    console.error(error);
    return NextResponse.json(
      { message: error.message },
      { status: StatusCodes.BAD_REQUEST, statusText: error.message }
    );
  }

  const { shopID, amount, category, description, title, date } = data;

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

    const expenseCollectionRef = shopDocRef.collection("expenses");
    const expenseDocRef = expenseCollectionRef.doc();

    const timestampDate = new Date(date);

    const expenseData: ExpenseType = {
      expenseID: expenseDocRef.id,
      title,
      amount,
      category,
      description,
      date: Timestamp.fromDate(timestampDate),
    };

    await expenseDocRef.set(expenseData);
    return NextResponse.json(
      { message: "Successfully added expense." },
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
