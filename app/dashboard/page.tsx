import Kanban from "@/components/kanban";
import ProtectedRouteWrapper from "@/components/ProtectedRouteWrapper";

export default function Home() {
  return (
    <ProtectedRouteWrapper>
      <div>
        <h1 className="p-4 text-2xl font-bold text-[#173563]">Dashboard</h1>
        <Kanban />
      </div>
    </ProtectedRouteWrapper>
  );
}
