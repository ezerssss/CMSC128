"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, BarChart, Settings, LogOut } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";

const sidebarItems = [
  { name: "Home", href: "/dashboard", icon: <Home /> },
  { name: "Order History", href: "/dashboard/order-history", icon: <FileText /> },
  { name: "Profit Tracker", href: "/dashboard/profit-tracker", icon: <BarChart /> },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 h-screen bg-gradient-to-b from-[#A6D3EF] to-[#EFF5FF] text-[#334E68]">
      <div className="p-6 flex justify-center items-center">
        <Image 
          src="/images/logo/name-logo.png"
          alt="Labada Logo" 
          width={150}
          height={100}
        />
      </div>

      <nav className="flex-1 p-4 space-y-4 overflow-auto">
        {sidebarItems.map((item) => (
          <Link key={item.name} href={item.href} passHref>
            <div
              className={`relative flex items-center space-x-4 p-3 transition-all cursor-pointer w-full
              ${pathname === item.href
                ? "bg-[#f3faff] border-l-4 border-[#173563] text-[#173563]"
                : "hover:bg-[#e2eaf5b8] hover:text-[#173563]"}`}
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
            className={`relative flex items-center space-x-4 p-4 pl-6 transition-all cursor-pointer w-full hover:bg-[#EFF5FF]
            ${pathname === "/settings" ? "bg-[#cfe6f8] border-l- border-[#173563] text-[#173563]" : ""}`}
          >
            <Settings className="text-[#173563]" />
            <span>Settings</span>
          </div>
        </Link>

        <div className="flex items-center justify-between p-4 mt-2 bg-[#EFF5FF] rounded-md shadow-inner">
          <div className="flex items-center space-x-2">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://via.placeholder.com/150" alt="User Profile" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-[#334E68]">Ezra Magbanua</p>
              <p className="text-xs text-gray-500">Scrum Master</p>
            </div>
          </div>

          <Link href="/logout" className="p-2 text-gray-500 hover:text-[#173563]">
            <LogOut />
          </Link>
        </div>
      </div>
    </div>
  );
}
