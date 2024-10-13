"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import OrderHistoryTable from './OrderHistoryTable'; 
import SearchFilterDropdown from './SearchFilterDropdown';
import { X } from "lucide-react";


const orderData = [
  {
    orderId: "#001",
    name: "Ezra Magbanua",
    address: "Balay Lampirong, UPV, Miagao",
    serviceType: "Dry Wash",
    bag: "Blue Duffle Bag",
    weight: 5,
    logistics: "Delivery",
    status: "To do",
    paymentStatus: "Unpaid",
    date: "10/09/2024",
  },
  {
    orderId: "#002",
    name: "Isabel Garcia",
    address: "International Dormitory, UPV, Miagao",
    serviceType: "Folded",
    bag: "Red Backpack",
    weight: 3,
    logistics: "Pick-up",
    status: "Completed",
    paymentStatus: "Paid",
    date: "10/08/2024",
  },
  {
    orderId: "#003",
    name: "Mark Reyes",
    address: "Balay Gumamela, UPV, Miagao",
    serviceType: "Press Only",
    bag: "Yellow Tote Bag",
    weight: 7,
    logistics: "Delivery",
    status: "In progress",
    paymentStatus: "Unpaid",
    date: "10/07/2024",
  },
  {
    orderId: "#004",
    name: "Ana Santos",
    address: "Balay Kanlaon, UPV, Miagao",
    serviceType: "Dry Wash",
    bag: "Black Suitcase",
    weight: 10,
    logistics: "Delivery",
    status: "Completed",
    paymentStatus: "Paid",
    date: "10/06/2024",
  },
  {
    orderId: "#005",
    name: "Carlos Dela Cruz",
    address: "Balay Madyaas, UPV, Miagao",
    serviceType: "Laundry Wash and Fold",
    bag: "Green Gym Bag",
    weight: 4,
    logistics: "Pick-up",
    status: "To do",
    paymentStatus: "Unpaid",
    date: "10/05/2024",
  },
  {
    orderId: "#006",
    name: "Joana Bernardo",
    address: "Balay Kanlaon, UPV, Miagao",
    serviceType: "Press Only",
    bag: "Blue Backpack",
    weight: 6,
    logistics: "Delivery",
    status: "Completed",
    paymentStatus: "Paid",
    date: "10/04/2024",
  },
  {
    orderId: "#007",
    name: "Miguel Francisco",
    address: "Balay Kanlaon, UPV, Miagao",
    serviceType: "Dry Wash",
    bag: "Gray Duffle Bag",
    weight: 8,
    logistics: "Pick-up",
    status: "In progress",
    paymentStatus: "Unpaid",
    date: "10/03/2024",
  },
  {
    orderId: "#008",
    name: "Sofia Rodriguez",
    address: "Balay Lampirong, UPV, Miagao",
    serviceType: "Laundry Wash and Fold",
    bag: "Pink Suitcase",
    weight: 5,
    logistics: "Delivery",
    status: "To do",
    paymentStatus: "Unpaid",
    date: "10/02/2024",
  },
  {
    orderId: "#009",
    name: "Josefina Cruz",
    address: "Balay Miagao, UPV, Miagao",
    serviceType: "Press Only",
    bag: "Purple Backpack",
    weight: 2,
    logistics: "Pick-up",
    status: "Completed",
    paymentStatus: "Paid",
    date: "10/01/2024",
  },
  {
    orderId: "#010",
    name: "Paolo Villanueva",
    address: "Balay Lampirong, UPV, Miagao",
    serviceType: "Dry Wash",
    bag: "White Duffle Bag",
    weight: 9,
    logistics: "Delivery",
    status: "In progress",
    paymentStatus: "Unpaid",
    date: "09/30/2024",
  },
];


const serviceTypes = ["Dry Wash", "Folded", "Press Only"];
const logisticsOptions = ["Pick-up", "Delivery"];
const statuses = ["In progress", "Completed", "To do"];
const paymentStatuses = ["Unpaid", "Paid"];

const tableHeaders = [
  "Order ID", "Name", "Address", "Service Type", "Bag", "Weight (kg)", "Logistics", "Status", "Payment Status", "Date"
];


// Main
export default function OrderHistory() {
  // Search 
  const [filter, setFilter] = useState<string>(""); 
  // Service Type Filter
  const [serviceFilter, setServiceFilter] = useState<string[]>([]);
  // Logistics Filter
  const [logisticsFilter, setLogisticsFilter] = useState<string | null>(null);
  // Status Filter
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  // Payment Status Filter
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<string | null>(null);

  // Filter
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "clear") {
      clearFilters();
    } else if (serviceTypes.includes(value)) {
      setServiceFilter([value]); 
    } else if (logisticsOptions.includes(value)) {
      setLogisticsFilter(value);
    } else if (statuses.includes(value)) {
      setStatusFilter(value);
    } else if (paymentStatuses.includes(value)) {
      setPaymentStatusFilter(value);
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
    return orderData.filter(order => {
      const matchesName = order.name.toLowerCase().includes(filter.toLowerCase());
      const matchesServiceType = serviceFilter.length === 0 || serviceFilter.includes(order.serviceType);
      const matchesLogistics = !logisticsFilter || order.logistics === logisticsFilter;
      const matchesStatus = !statusFilter || order.status === statusFilter;
      const matchesPaymentStatus = !paymentStatusFilter || order.paymentStatus === paymentStatusFilter;

      return matchesName && matchesServiceType && matchesLogistics && matchesStatus && matchesPaymentStatus;
    });
  }, [filter, serviceFilter, logisticsFilter, statusFilter, paymentStatusFilter]);

  return (
    <div>
        <h1 className="text-2xl font-bold text-[#173563] p-4">Order History</h1>

      {/* Search and filter dropdown container */}
      <div className="flex items-center mb-6 gap-4">
        <Input
          placeholder="Search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-lg shadow-sm w-full"
        />

        {/* Search Filter Dropdown */}
        <div className="relative">
        <SearchFilterDropdown 
          handleFilterChange={handleFilterChange}
          serviceTypes={serviceTypes}
          logisticsOptions={logisticsOptions}
          statuses={statuses}
          paymentStatuses={paymentStatuses}
        />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        
        {/* Filter badges */}
        {serviceFilter.map((filterType, index) => (
          <div
            key={filterType}
            className="flex items-center bg-gray-200 px-3 py-1 rounded-full text-gray-700"
          >
            {filterType}
            <button
              onClick={() => setServiceFilter((prev) => prev.filter((type) => type !== filterType))}
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}

        {logisticsFilter && (
          <div
            className="flex items-center bg-gray-200 px-3 py-1 rounded-full text-gray-700"
          >
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
          <div
            className="flex items-center bg-gray-200 px-3 py-1 rounded-full text-gray-700"
          >
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
          <div
            className="flex items-center bg-gray-200 px-3 py-1 rounded-full text-gray-700"
          >
            {paymentStatusFilter}
            <button
              onClick={() => setPaymentStatusFilter(null)}
              className="ml-2 text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Clear all filters Button */}
        <Button
          onClick={clearFilters}
          disabled={!filter && serviceFilter.length === 0 && !logisticsFilter && !statusFilter && !paymentStatusFilter}
          className={`ml-2 ${filter || serviceFilter.length > 0 || logisticsFilter || statusFilter || paymentStatusFilter ? "bg-[#DBEAFF] text-gray-800 hover:bg-blue-300" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
          >
          Clear All
        </Button>
      </div>

      <div className="border border-gray-300 shadow-lg rounded-2xl overflow-hidden mt-6 p-4">
      {/* Table */}
      <OrderHistoryTable orders={filteredOrders} />
    </div>

    </div>
  );
}
