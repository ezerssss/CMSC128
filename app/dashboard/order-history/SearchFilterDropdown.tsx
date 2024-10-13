import React from 'react';

interface SearchFilterDropdownProps {
  handleFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  serviceTypes: string[];
  logisticsOptions: string[];
  statuses: string[];
  paymentStatuses: string[];
}

const SearchFilterDropdown: React.FC<SearchFilterDropdownProps> = ({
  handleFilterChange,
  serviceTypes,
  logisticsOptions,
  statuses,
  paymentStatuses,
}) => {
  return (
    <div className="relative">
      <select
        onChange={handleFilterChange}
        className="border border-gray-300 px-3 py-2 rounded-lg shadow-sm w-full"
        style={{ backgroundColor: '#DBEAFF', color: 'black' }}
      >
        <option value="" className="text-black">Select Filter</option>
        <optgroup label="Service Types">
          {serviceTypes.map((type) => (
            <option key={type} value={type} className="text-black">{type}</option>
          ))}
        </optgroup>
        <optgroup label="Logistics">
          {logisticsOptions.map((logistics) => (
            <option key={logistics} value={logistics} className="text-black">{logistics}</option>
          ))}
        </optgroup>
        <optgroup label="Order Statuses">
          {statuses.map((status) => (
            <option key={status} value={status} className="text-black">{status}</option>
          ))}
        </optgroup>
        <optgroup label="Payment Statuses">
          {paymentStatuses.map((paymentStatus) => (
            <option key={paymentStatus} value={paymentStatus} className="text-black">{paymentStatus}</option>
          ))}
        </optgroup>
      </select>
    </div>
  );
};

export default SearchFilterDropdown;
