"use client";

import React, { useState } from "react";
import AddExpense from "./AddExpense";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import useUnpaidOrders from "@/app/hooks/useUnpaidOrders";
import useExpense from "@/app/hooks/useExpense";
import useRevenue from "@/app/hooks/useRevenue";
import { twMerge } from "tailwind-merge";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import useGetChartData from "@/app/hooks/useGetChartData";

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#78ad71",
  },
  expense: {
    label: "Expenses",
    color: "#db6969",
  },
} satisfies ChartConfig;

export default function ProfitTracker() {
  const { unpaidOrders } = useUnpaidOrders();
  const { revenue, paidOrders } = useRevenue();
  const { totalExpenses, expenses, categoryBreakdown } = useExpense();
  const profit = revenue - totalExpenses;

  const { weekData, yearData, allTimeData } = useGetChartData(
    paidOrders,
    expenses
  );
  // 0 - week, 1 - year, 2 - all time
  const [chartMode, setChartMode] = useState(0);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="p-4 text-xl font-bold text-[#4A6CA0]">Profit Summary</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-xl bg-[#D8EAF9] p-4">
            <p className="text-sm text-gray-500">Total Revenue</p>
            <h3 className="text-xl">₱{revenue}</h3>
          </div>
          <div className="rounded-xl bg-[#D8EAF9] p-4">
            <p className="text-sm text-gray-500">Total Expenses</p>
            <h3 className="text-xl">₱{totalExpenses}</h3>
          </div>
          <div className="rounded-xl bg-[#D8EAF9] p-4">
            <p className="text-sm text-gray-500">Net Profit</p>
            <h3
              className={twMerge(
                "text-xl",
                profit > 0 ? "text-[#4a7d43]" : "text-[#db6969]"
              )}
            >
              ₱{profit}
            </h3>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="px-4 text-xl font-bold text-[#4A6CA0]">
            Revenue and Expenses Overtime
          </h2>
          <div className="flex space-x-2 text-sm text-white">
            <Button
              className="rounded-md bg-[#4A6CA0] px-4 py-2"
              onClick={() => setChartMode(2)}
            >
              All Time
            </Button>
            <Button
              className="rounded-md bg-[#4A6CA0] px-4 py-2"
              onClick={() => setChartMode(1)}
            >
              Year
            </Button>
            <Button
              className="rounded-md bg-[#4A6CA0] px-4 py-2"
              onClick={() => setChartMode(0)}
            >
              Week
            </Button>
          </div>
        </div>
        <ChartContainer
          config={chartConfig}
          className="max-h-[400px] min-h-[400px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={
              chartMode === 0
                ? weekData
                : chartMode === 1
                  ? yearData
                  : allTimeData
            }
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="xLabel"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 4)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="expenses" fill="var(--color-expense)" radius={4} />
            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
          </BarChart>
        </ChartContainer>
      </section>

      <section>
        <h2 className="p-4 text-xl font-bold text-[#4A6CA0]">Unpaid Orders</h2>
        <div className="rounded-lg bg-white shadow-md">
          <Table>
            <TableHeader>
              <TableRow>
                {["Name", "Order Amount", "Date created"].map((header) => (
                  <TableHead
                    key={header}
                    className="px-4 py-2 font-bold text-black"
                  >
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {unpaidOrders.map((order) => (
                <TableRow key={order.orderID}>
                  <TableCell className="px-4 py-2">{order.name}</TableCell>
                  <TableCell className="px-4 py-2">₱{order.price}</TableCell>
                  <TableCell className="px-4 py-2">
                    {order.dateCreated.toDate().toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <section>
        <div className="flex items-center gap-1">
          <h2 className="p-4 text-xl font-bold text-[#4A6CA0]">Expenses</h2>
          <AddExpense />
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="w-[32%] rounded-xl bg-[#D8EAF9] p-3">
            <h3 className="mb-3 text-lg font-semibold">Category Breakdown</h3>
            <ul>
              <li className="mb-3 rounded-xl bg-white px-4 py-2 text-[#2A4978]">
                Supplies: ₱{categoryBreakdown.supplies}
              </li>
              <li className="mb-3 rounded-xl bg-white px-4 py-2 text-[#2A4978]">
                Labor: ₱{categoryBreakdown.labor}
              </li>
              <li className="mb-3 rounded-xl bg-white px-4 py-2 text-[#2A4978]">
                Utilities: ₱{categoryBreakdown.utilities}
              </li>
            </ul>
          </div>

          <section className="flex-1 py-4">
            <h3 className="mb-4 text-lg font-semibold">Expense History</h3>
            <Table className="min-w-full table-auto overflow-hidden rounded-2xl bg-white">
              <TableHeader>
                <TableRow>
                  {["Title", "Amount", "Category", "Description", "Date"].map(
                    (header, index) => (
                      <TableHead
                        key={index}
                        className="px-4 py-2 font-bold text-black"
                      >
                        {header}
                      </TableHead>
                    )
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.map((expense) => (
                  <TableRow key={expense.expenseID}>
                    <TableCell className="px-4 py-2">{expense.title}</TableCell>
                    <TableCell className="px-4 py-2">
                      ₱{expense.amount}
                    </TableCell>
                    <TableCell className="px-4 py-2">
                      {expense.category}
                    </TableCell>
                    <TableCell className="px-4 py-2">
                      {expense.description || "N/A"}
                    </TableCell>
                    <TableCell className="px-4 py-2">
                      {expense.date.toDate().toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>
        </div>
      </section>
    </div>
  );
}
