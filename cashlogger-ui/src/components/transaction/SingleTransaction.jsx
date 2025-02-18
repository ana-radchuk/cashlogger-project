import React from "react";
import { FaEdit, FaTimes } from "react-icons/fa";

const SingleTransaction = ({ transaction }) => {
  const editTransaction = (transaction) => {
    // Edit transaction logic
  };

  const deleteTransaction = (id) => {
    // Delete transaction logic
  };

  const formatAmount = (amount) => {
    if (!amount) return "$0.00";

    return amount.toLocaleString("en-CA", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="flex justify-between items-center bg-white border border-gray-300 rounded-lg shadow-md p-4 w-full hover:shadow-lg transition-transform transform hover:scale-105">
      {/* Left Section: Transaction Information */}

      <div className="flex flex-col space-y-2 w-3/4">
        <div className="flex items-center space-x-2">
          {/* Category Button */}
          <button className="bg-gray-200 text-gray-600 rounded-lg px-2 py-1 text-xs font-medium hover:bg-gray-300 transition">
            <span className="mr-0.5">{transaction.category.emoji}</span>
            <span>{transaction.category.name}</span>
          </button>
          <p className="text-sm font-medium text-gray-700 truncate">
            {transaction.name}
          </p>
        </div>

        {/* Date & Time and Amount */}

        <div className="flex justify-between text-xs text-gray-500">
          {/* Date & Time */}
          <p>
            {new Date(transaction.createdAt).toLocaleString("en-CA", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>

          {/* Amount */}
          <p className="text-xs font-medium text-gray-700">
            {transaction.transactionType === "EXPENSE" ? "-" : ""}$
            {formatAmount(transaction.amount)}
          </p>
        </div>
      </div>

      {/* Right Section: Action Buttons */}
      <div className="flex flex-col space-y-2 w-1/4 items-end">
        {/* Edit Button */}
        <button
          onClick={() => editTransaction(transaction)}
          className="bg-gray-200 text-gray-600 rounded-lg flex items-center justify-center p-2 hover:bg-gray-300 transition"
        >
          <FaEdit />
        </button>

        {/* Delete Button */}
        <button
          onClick={() => deleteTransaction(transaction.id)}
          className="bg-gray-200 text-gray-600 rounded-lg flex items-center justify-center p-2 hover:bg-gray-300 transition"
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default SingleTransaction;
