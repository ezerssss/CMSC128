"use client";

import Link from "next/link";
import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getBadgeColor } from "@/lib/colors";
import { OrderType } from "@/app/types/client/item";
import { getBoardStatusTitle } from "@/lib/utils";

interface OrderHistoryTableProps {
  orders: OrderType[];
}

const tableHeaders = [
  "Order ID",
  "Name",
  "Address",
  "Service Type",
  "Bag",
  "Weight (kg)",
  "Logistics",
  "Status",
  "Payment Status",
  "Date",
];

export default function OrderHistoryTable({ orders }: OrderHistoryTableProps) {
  return (
    <Table className="min-w-full table-auto overflow-hidden rounded-2xl">
      <TableHeader>
        <TableRow
          className="whitespace-nowrap rounded-t-2xl text-left text-sm font-semibold uppercase tracking-wide"
          style={{ backgroundColor: "#DBEAFF" }}
        >
          {tableHeaders.map((header) => (
            <TableHead
              key={header}
              className="px-4 py-2 text-[12px] font-bold text-black"
            >
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {orders.length > 0 ? (
          orders.map((order) => (
            <TableRow key={order.orderID} className="border-b border-gray-200">
              <TableCell className="px-2 py-2 text-[12px]">
                <Link
                  href={`/tracker?shopID=${order.shopID}&orderID=${order.orderID}`}
                  className="font-bold text-[#173563] underline"
                >
                  {order.orderID}
                </Link>
              </TableCell>
              <TableCell className="px-4 py-2">{order.name}</TableCell>
              <TableCell className="px-4 py-2">{order.address}</TableCell>
              <TableCell className="px-4 py-2">
                {order.services.join(", ")}
              </TableCell>
              <TableCell className="px-4 py-2">{order.bag}</TableCell>
              <TableCell className="px-4 py-2 text-center">
                {order.weight}
              </TableCell>
              <TableCell className="px-4 py-2">{order.logistics}</TableCell>
              <TableCell className="px-4 py-2">
                <Badge className={`${getBadgeColor(order.boardStatus)}`}>
                  {getBoardStatusTitle(order.boardStatus)}
                </Badge>
              </TableCell>
              <TableCell className="px-4 py-2">
                <Badge className={`${getBadgeColor(order.paymentStatus)}`}>
                  {order.paymentStatus}
                </Badge>
              </TableCell>
              <TableCell className="px-4 py-2">
                {order.dateCreated.toDate().toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={tableHeaders.length}
              className="py-4 text-center"
            >
              No orders found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
