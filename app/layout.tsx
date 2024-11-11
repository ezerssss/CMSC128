import type { Metadata } from "next";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Laba-Da!",
  description: "Business management for Laundry shops",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`flex min-h-screen ${inter.className}`}>
        <div className="flex-1">
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster richColors />
        </div>
      </body>
    </html>
  );
}
