import ProtectedRouteWrapper from "@/components/ProtectedRouteWrapper";
export default function Tracker() {
  return (
    <ProtectedRouteWrapper>
      <div>
        <h1 className="p-4 text-2xl font-bold text-[#173563]">
          Profit Tracker
        </h1>
      </div>
    </ProtectedRouteWrapper>
  );
}
