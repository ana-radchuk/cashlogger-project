import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaDollarSign } from "react-icons/fa";

const CurrentBalance = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("February"); // Default to current month
  const dropdownRef = useRef(null);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
    setShowDropdown(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex justify-center items-center">
      <div className="w-full max-w-md bg-white p-6 shadow-lg rounded">
        {/* Title Section */}
        <h1 className="text-xl font-semibold text-gray-700 text-center pb-4">
          Current Balance
        </h1>

        {/* Month Selector */}
        <div className="relative flex items-center gap-4">
          <div className="w-1/2 mb-4">

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Month
            </label>

            <div
              className="flex items-center justify-between border-b shadow-sm px-4 py-2 cursor-pointer text-gray-700 hover:border-amber-500"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span>{selectedMonth}</span>
              <FaChevronDown className="text-gray-500" />
            </div>

            {showDropdown && (
              <ul
                ref={dropdownRef}
                className="absolute bg-white border rounded shadow-sm mt-1 w-1/2 z-10"
              >
                {months.map((month) => (
                  <li
                    key={month}
                    onClick={() => handleMonthSelect(month)}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-gray-700"
                  >
                    {month}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Balance Section */}
          <div className="mb-4 w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total
            </label>
            <div className="flex items-center border-b shadow-sm px-4 py-2">
            <span className="text-gray-500 mr-2">
                <FaDollarSign />
              </span>
              <input
                disabled
                type="text"
                placeholder="0.00"
                className="w-full bg-transparent text-left text-gray-700 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Income and Expense Section */}
        <div className="flex items-center gap-4">

          {/* Expense Label */}
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Income
            </label>

            <div className="flex items-center border-b shadow-sm px-4 py-2">
              <span className="text-gray-500 mr-2">
                <FaDollarSign />
              </span>
              <input
                disabled
                type="text"
                placeholder="0.00"
                className="w-full bg-transparent text-left text-gray-700 focus:outline-none"
              />
            </div>
          </div>

          {/* Income Section */}
          <div className="w-1/2">

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expenses
            </label>

            <div className="flex items-center border-b shadow-sm px-4 py-2">
            <span className="text-gray-500 mr-2">
                <FaDollarSign />
              </span>
              <input
                disabled
                type="text"
                placeholder="0.00"
                className="w-full bg-transparent text-left text-gray-700 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentBalance;
