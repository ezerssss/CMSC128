"use client";

import Link from "next/link";
import Board from "@/components/kanban";
import React from "react";
import ProtectedRouteWrapper from "@/components/ProtectedRouteWrapper";
import useShopID from "./store";

function HomePage() {
  const { shopID } = useShopID();
  console.log(shopID);

  return (
    <ProtectedRouteWrapper delay>
      <main className="h-full w-screen p-5">
        <Board />

        <div className="mt-8">
          <Link
            href="/login"
            className="rounded-md bg-blue-500 px-6 py-3 text-white transition hover:bg-blue-700"
          >
            Login Page
          </Link>
        </div>

        <div className="mt-8">
          <Link
            href="/tracker"
            className="rounded-md bg-blue-500 px-6 py-3 text-white transition hover:bg-blue-700"
          >
            Laundry Tracker
          </Link>
        </div>
      </main>
    </ProtectedRouteWrapper>
  );
}

export default HomePage;
