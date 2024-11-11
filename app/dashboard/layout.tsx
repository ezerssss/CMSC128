import ProtectedRouteWrapper from "@/components/ProtectedRouteWrapper";
import { Sidebar } from "@/components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRouteWrapper className="flex h-full">
      <Sidebar />
      <main className="flex-1 p-4">{children}</main>
    </ProtectedRouteWrapper>
  );
}
