"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, BarChart, Settings, LogOut } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import useUser from "@/app/hooks/useUser";
import clientAuth from "@/app/firebase/clientAuth";

const sidebarItems = [
  { name: "Home", href: "/dashboard", icon: <Home /> },
  {
    name: "Order History",
    href: "/dashboard/order-history",
    icon: <FileText />,
  },
  {
    name: "Profit Tracker",
    href: "/dashboard/profit-tracker",
    icon: <BarChart />,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const user = useUser();

  return (
    <div className="sticky top-0 flex h-screen w-60 flex-col bg-gradient-to-b from-[#A6D3EF] to-[#EFF5FF] text-[#334E68]">
      <div className="flex items-center justify-center p-6">
        <Image
          src="/images/logo/name-logo.png"
          alt="Labada Logo"
          width={150}
          height={100}
        />
      </div>

      <nav className="flex-1 space-y-4 overflow-auto p-4">
        {sidebarItems.map((item) => (
          <Link key={item.name} href={item.href} passHref>
            <div
              className={`relative flex w-full cursor-pointer items-center space-x-4 p-3 transition-all ${
                pathname === item.href
                  ? "border-l-4 border-[#173563] bg-[#f3faff] text-[#173563]"
                  : "hover:bg-[#e2eaf5b8] hover:text-[#173563]"
              }`}
            >
              <div className="text-[#173563]">{item.icon}</div>
              <span>{item.name}</span>
            </div>
          </Link>
        ))}
      </nav>

      <div className="border-t border-[#17356340] pt-2">
        <Link href="/settings" passHref>
          <div
            className={`relative flex w-full cursor-pointer items-center space-x-4 p-4 pl-6 transition-all hover:bg-[#EFF5FF] ${pathname === "/settings" ? "border-l- border-[#173563] bg-[#cfe6f8] text-[#173563]" : ""}`}
          >
            <Settings className="text-[#173563]" />
            <span>Settings</span>
          </div>
        </Link>

        <div className="mt-2 flex items-center justify-between rounded-md bg-[#EFF5FF] p-4 shadow-inner">
          <div className="flex items-center space-x-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.photoURL || ""} alt="User Profile" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-[#334E68]">{user?.email}</p>
            </div>
          </div>

          <button
            className="p-2 text-gray-500 hover:text-[#173563]"
            onClick={async () => await clientAuth.signOut()}
          >
            <LogOut />
          </button>
        </div>
      </div>
    </div>
  );
}
