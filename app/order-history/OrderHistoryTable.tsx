"use client";

import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getBadgeColor } from "@/lib/colors";

interface OrderHistoryTableProps {
  orders: Array<{
    orderId: string;
    name: string;
    address: string;
    serviceType: string;
    bag: string;
    weight: number;
    logistics: string;
    status: string;
    paymentStatus: string;
    date: string;
  }>;
}

const tableHeaders = [
  "Order ID", "Name", "Address", "Service Type", "Bag", "Weight (kg)", "Logistics", "Status", "Payment Status", "Date"
];

export default function OrderHistoryTable({ orders }: OrderHistoryTableProps) {
  return (
    <Table className="min-w-full table-auto rounded-2xl overflow-hidden">
      <TableHeader>
        <TableRow
          className="text-left uppercase tracking-wide text-sm font-semibold rounded-t-2xl"
          style={{ backgroundColor: '#DBEAFF' }} 
        >
          {tableHeaders.map((header) => (
            <TableHead 
              key={header} 
              className="py-2 px-4 text-black font-bold"  
            >
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>




      <TableBody>
        {orders.length > 0 ? (
          orders.map((order) => (
            <TableRow key={order.orderId} className="border-b border-gray-200">
              <TableCell className="py-2 px-4">{order.orderId}</TableCell>
              <TableCell className="py-2 px-4">{order.name}</TableCell>
              <TableCell className="py-2 px-4">{order.address}</TableCell>
              <TableCell className="py-2 px-4">{order.serviceType}</TableCell>
              <TableCell className="py-2 px-4">{order.bag}</TableCell>
              <TableCell className="py-2 px-4">{order.weight}</TableCell>
              <TableCell className="py-2 px-4">{order.logistics}</TableCell>
              <TableCell className="py-2 px-4">
                <Badge className={getBadgeColor(order.status)}>{order.status}</Badge>
              </TableCell>
              <TableCell className="py-2 px-4">
                <Badge className={getBadgeColor(order.paymentStatus)}>{order.paymentStatus}</Badge>
              </TableCell>
              <TableCell className="py-2 px-4">{order.date}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={tableHeaders.length} className="text-center py-4">
              No orders found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
