"use client";

import Link from "next/link";
import React from "react";
import ProtectedRouteWrapper from "@/components/ProtectedRouteWrapper";
import useShopID from "@/app/store";

function HomePage() {
  const { shopID } = useShopID();

  return (
    <ProtectedRouteWrapper delay>
      <main className="h-full w-screen p-5">
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
            href="/trackOrder"
            className="rounded-md bg-blue-500 px-6 py-3 text-white transition hover:bg-blue-700"
          >
            Laundry Tracker
          </Link>
        </div>

        <div className="mt-8">
          <Link
            href="/dashboard"
            className="rounded-md bg-blue-500 px-6 py-3 text-white transition hover:bg-blue-700"
          >
            Dashboard
          </Link>
        </div>
      </main>
    </ProtectedRouteWrapper>
  );
}

export default HomePage;
