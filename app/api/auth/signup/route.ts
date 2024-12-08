import { NextRequest, NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import serverDb from "@/app/firebase/serverDB";
import { Timestamp } from "firebase-admin/firestore";
import { getErrorMessage } from "@/lib/error";
import { SignUpRequestSchema, UserDataType } from "@/app/types/server/auth";
import { LaundryShopType } from "@/app/types/server/shop";
import serverAuth from "@/app/firebase/serverAuth";

const userCollectionRef = serverDb.collection("users");
const shopsCollectionRef = serverDb.collection("shops");

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { data, error } = SignUpRequestSchema.safeParse(body);

  if (error) {
    console.error(error.message);
    return NextResponse.json(
      { message: error.message },
      { status: StatusCodes.BAD_REQUEST, statusText: error.message }
    );
  }

  try {
    const { laundryShopName, laundryShopImage, ...user } = data;

    // Create laundry shop profile
    const laundryShopDocumentRef = await shopsCollectionRef.add({});
    const laundryShopID = laundryShopDocumentRef.id;

    const laundryProfile: LaundryShopType = {
      shopID: laundryShopID,
      name: laundryShopName,
      imageURL: laundryShopImage,
      dateCreated: Timestamp.now(),
      dateModified: Timestamp.now(),
    };

    await laundryShopDocumentRef.set(laundryProfile);

    // Create user profile
    const userProfile: UserDataType = {
      ...user,
      shopID: laundryShopID,
      dateCreated: Timestamp.now(),
    };

    await userCollectionRef.doc(user.uid).set(userProfile);

    await serverAuth.updateUser(user.uid, {
      photoURL: laundryShopImage,
    });

    return NextResponse.json(
      { message: "Successfully created account." },
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
