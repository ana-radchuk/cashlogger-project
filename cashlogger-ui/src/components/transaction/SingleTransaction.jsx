import React from "react";

const SingleTransaction = ({ transaction }) => {
  const editTransaction = (transaction) => {
    // Example API call:
    // fetch(`/api/transactions/${transaction.id}`, { method: "PUT", body: JSON.stringify(updatedData) })
  };

  const deleteTransaction = (id) => {
    // Example API call:
    // fetch(`/api/transactions/${id}`, { method: "DELETE" })
  };

  return (
    <div className="flex justify-between items-center bg-white border border-gray-300 rounded-lg shadow-md p-4 hover:shadow-lg transition transform hover:scale-105">
      
      {/* Left Section: Transaction Information */}
      <div className="flex flex-col space-y-1">
        {/* Transaction Name */}
        <p className="text-lg font-semibold text-gray-800 truncate">
          {transaction.name}
        </p>

        {/* Transaction Details */}
        <div className="flex flex-wrap text-sm text-gray-600">
            <p className="font-medium text-emerald-600 mr-4">
              {transaction.transactionType === "INCOME" ? "+" : "-"}${transaction.amount}
            </p>
            <p className="font-medium text-gray-500">
              {new Date(transaction.createdAt).toUTCString()}
            </p>
        </div>
      </div>

      {/* Right Section: Action Buttons */}
      <div className="flex flex-col space-y-2">
        {/* Edit Button */}
        <button
          onClick={() => editTransaction(transaction)}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Edit
        </button>

        {/* Delete Button */}
        <button
          onClick={() => deleteTransaction(transaction.id)}
          className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default SingleTransaction;
