"use client";

import React from "react";
import AddExpense from "./AddExpense";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

export default function ProfitTracker() {
  return (
    <div>
      <h1 className="p-4 text-2xl font-bold text-[#173563]">Profit Tracker</h1>

      <section className="bg-[#4A6CA0] rounded-[30px] p-6 mb-6">
        <h2 className="text-[22px] font-bold px-5 mb-4 text-white">Profit Summary</h2>
        <div className="grid grid-cols-3 gap-4 px-10">
          {["Revenue", "Total Expenses", "Net Profit"].map((title, index) => (
            <div key={index} className="bg-[#94B1D1] p-4 rounded-[30px]">
              <p className="text-sm text-white px-4">{title}</p>
              <h3 className="text-[25px] text-white font-semibold px-4">
                P {1500 + index * 1500}
              </h3>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-4 px-5">
          <h2 className="text-[#4A6CA0] text-[18px] font-bold">Revenue and Expenses Overtime</h2>
          <Menubar className="flex space-x-2">
            {["All Time", "Year", "Week", "Day"].map((period, index) => (
              <MenubarMenu key={index}>
                <MenubarTrigger className="text-white text-sm bg-[#4A6CA0] px-4 py-2 rounded-md">
                  {period}
                </MenubarTrigger>
                <MenubarContent className="bg-white text-black rounded-md shadow-lg">
                  <MenubarItem></MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            ))}
          </Menubar>
        </div>
        <div className="w-full h-48 bg-gray-100 rounded-md flex items-center justify-center">
          <p>Graph</p>
        </div>
      </section>

      <section className="px-10">
        <h2 className="text-[#4A6CA0] text-[18px] font-bold mt-6">Unpaid Orders</h2>
        <div className="bg-white rounded-lg shadow-md mb-6">
          <Table>
            <TableHeader>
              <TableRow>
                {["Name", "Order Amount", "Payment Due Date"].map((header, index) => (
                  <TableHead key={index} className="px-4 py-2 font-bold text-black">
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                {["Ezra Magbanua", "P200", "11-20-2024"].map((cell, index) => (
                  <TableCell key={index} className="px-4 py-2">
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      <section className="bg-[#4A6CA0] rounded-[30px] p-6 mb-6">
        <div className="flex items-center gap-3 px-5 mb-4">
          <h2 className="text-[22px] font-bold text-white">Expenses</h2>
          <AddExpense />
        </div>
        <div className="grid grid-cols-3 gap-4 mb-6 px-10">
          {["Daily Expense", "Weekly Expense", "Monthly Expense"].map((expense, index) => (
            <div key={index} className="bg-[#94B1D1] p-4 rounded-[30px]">
              <p className="text-sm text-white px-4">{expense}</p>
              <h3 className="text-[25px] text-white font-semibold px-4">
                P {1500 + index * 1500}
              </h3>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 px-10">
          <div className="bg-[#94B1D1] p-4 rounded-[30px] w-[32%]">
            <h3 className="text-sm text-white px-4 mb-5">Category Breakdown</h3>
            <ul className="px-2">
              {["Supplies: P5000", "Labor: P6000", "Utilities: P5000"].map((item, index) => (
                <li
                  key={index}
                  className="bg-[#C7D6E6] rounded-[23px] text-[#2A4978] font-semibold text-[20px] px-5 py-2 mb-3"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <section className="w-[66%]">
            <h2 className="text-white text-[18px] font-bold mb-4">Expense History</h2>
            <Table className="bg-white min-w-full table-auto overflow-hidden rounded-2xl">
              <TableHeader>
                <TableRow>
                  {["Title", "Amount", "Category", "Description", "Date"].map((header, index) => (
                    <TableHead key={index} className="px-4 py-2 font-bold text-black">
                      {header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  {["Something", "P200", "Utilities", "N/A", "11-20-2024"].map((cell, index) => (
                    <TableCell key={index} className="px-4 py-2">
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
          </section>
        </div>
      </section>
    </div>
  );
}
