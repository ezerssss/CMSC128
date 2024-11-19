import {
  BoardStatusOptions,
  LogisticsOptions,
  PaymentOptions,
  ServicesOptions,
} from "@/app/constants/options";
import React from "react";

interface SearchFilterDropdownProps {
  handleFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SearchFilterDropdown: React.FC<SearchFilterDropdownProps> = ({
  handleFilterChange,
}) => {
  return (
    <div className="relative">
      <select
        onChange={handleFilterChange}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm"
        style={{ backgroundColor: "#DBEAFF", color: "black" }}
      >
        <option value="" className="text-black">
          Select Filter
        </option>
        <optgroup label="Service Types">
          {ServicesOptions.map(({ label, value }) => (
            <option key={value} value={value} className="text-black">
              {label}
            </option>
          ))}
        </optgroup>
        <optgroup label="Logistics">
          {LogisticsOptions.map(({ label, value }) => (
            <option key={value} value={value} className="text-black">
              {label}
            </option>
          ))}
        </optgroup>
        <optgroup label="Order Statuses">
          {BoardStatusOptions.map(({ label, value }) => (
            <option key={value} value={value} className="text-black">
              {label}
            </option>
          ))}
        </optgroup>
        <optgroup label="Payment Statuses">
          {PaymentOptions.map(({ label, value }) => (
            <option key={value} value={value} className="text-black">
              {label}
            </option>
          ))}
        </optgroup>
      </select>
    </div>
  );
};

export default SearchFilterDropdown;
