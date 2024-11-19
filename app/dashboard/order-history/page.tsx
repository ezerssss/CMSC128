"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import OrderHistoryTable from "./OrderHistoryTable";
import SearchFilterDropdown from "./SearchFilterDropdown";
import { X } from "lucide-react";
import useOrderHistory from "@/app/hooks/useOrderHistory";
import { LogisticsEnum, ServicesEnum } from "@/app/enums/services";
import { BoardStatusEnum } from "@/app/enums/board";
import { PaymentStatusEnum } from "@/app/enums/payment";
import {
  BoardStatusOptions,
  LogisticsOptions,
  PaymentOptions,
  ServicesOptions,
} from "@/app/constants/options";

export default function OrderHistory() {
  const { orders } = useOrderHistory();

  const [filter, setFilter] = useState<string>("");
  const [serviceFilter, setServiceFilter] = useState<ServicesEnum[]>([]);
  const [logisticsFilter, setLogisticsFilter] = useState<LogisticsEnum | null>(
    null
  );
  const [statusFilter, setStatusFilter] = useState<BoardStatusEnum | null>(
    null
  );
  const [paymentStatusFilter, setPaymentStatusFilter] =
    useState<PaymentStatusEnum | null>(null);

  // Filter
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "clear") {
      clearFilters();
    } else if (
      ServicesOptions.find(({ value: optionValue }) => optionValue == value)
    ) {
      setServiceFilter([...serviceFilter, value as ServicesEnum]);
    } else if (
      LogisticsOptions.find(({ value: optionValue }) => optionValue == value)
    ) {
      setLogisticsFilter(value as LogisticsEnum);
    } else if (
      BoardStatusOptions.find(({ value: optionValue }) => optionValue == value)
    ) {
      setStatusFilter(value as BoardStatusEnum);
    } else if (
      PaymentOptions.find(({ value: optionValue }) => optionValue == value)
    ) {
      setPaymentStatusFilter(value as PaymentStatusEnum);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setFilter("");
    setServiceFilter([]);
    setLogisticsFilter(null);
    setStatusFilter(null);
    setPaymentStatusFilter(null);
  };

  // Memoized filter
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesName =
        !filter || order.name.toLowerCase().includes(filter.toLowerCase());

      // Defaults to true if no service filter
      let matchesServiceType = true;

      for (let filter of serviceFilter) {
        matchesServiceType =
          matchesServiceType && order.services.includes(filter);
      }

      const matchesAddress = order.address
        ?.toLowerCase()
        .includes(filter.toLowerCase());
      const matchesLogistics =
        !logisticsFilter || order.logistics === logisticsFilter;
      const matchesStatus = !statusFilter || order.boardStatus === statusFilter;
      const matchesPaymentStatus =
        !paymentStatusFilter || order.paymentStatus === paymentStatusFilter;

      return (
        (matchesName || matchesAddress) &&
        matchesServiceType &&
        matchesLogistics &&
        matchesStatus &&
        matchesPaymentStatus
      );
    });
  }, [
    filter,
    serviceFilter,
    logisticsFilter,
    statusFilter,
    paymentStatusFilter,
    orders,
  ]);

  return (
    <div>
      <h1 className="p-4 text-2xl font-bold text-[#173563]">Order History</h1>

      {/* Search and filter dropdown container */}
      <div className="mb-6 flex items-center gap-4">
        <Input
          placeholder="Search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm"
        />

        {/* Search Filter Dropdown */}
        <div className="relative">
          <SearchFilterDropdown handleFilterChange={handleFilterChange} />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {/* Filter badges */}
        {serviceFilter.map((filterType) => (
          <div
            key={filterType}
            className="flex items-center rounded-full bg-gray-200 px-3 py-1 text-gray-700"
          >
            {filterType}
            <button
              onClick={() =>
                setServiceFilter((prev) =>
                  prev.filter((type) => type !== filterType)
                )
              }
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}

        {logisticsFilter && (
          <div className="flex items-center rounded-full bg-gray-200 px-3 py-1 text-gray-700">
            {logisticsFilter}
            <button
              onClick={() => setLogisticsFilter(null)}
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {statusFilter && (
          <div className="flex items-center rounded-full bg-gray-200 px-3 py-1 text-gray-700">
            {statusFilter}
            <button
              onClick={() => setStatusFilter(null)}
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {paymentStatusFilter && (
          <div className="flex items-center rounded-full bg-gray-200 px-3 py-1 text-gray-700">
            {paymentStatusFilter}
            <button
              onClick={() => setPaymentStatusFilter(null)}
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        <Button
          onClick={clearFilters}
          disabled={
            !filter &&
            serviceFilter.length === 0 &&
            !logisticsFilter &&
            !statusFilter &&
            !paymentStatusFilter
          }
          className={`ml-2 ${filter || serviceFilter.length > 0 || logisticsFilter || statusFilter || paymentStatusFilter ? "bg-[#DBEAFF] text-gray-800 hover:bg-blue-300" : "cursor-not-allowed bg-gray-300 text-gray-500"}`}
        >
          Clear All
        </Button>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-gray-300 p-4 shadow-lg">
        <OrderHistoryTable orders={filteredOrders} />
      </div>
    </div>
  );
}
