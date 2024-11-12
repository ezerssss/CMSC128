import React from "react";
import ProtectedRouteWrapper from "@/components/ProtectedRouteWrapper";

function HomePage() {
  return (
    <ProtectedRouteWrapper delay>
      <main className="h-full w-screen p-5">LABADA</main>
    </ProtectedRouteWrapper>
  );
}

export default HomePage;
