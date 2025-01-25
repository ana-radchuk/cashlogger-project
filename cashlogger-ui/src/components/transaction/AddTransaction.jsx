import React, { Component, createRef } from "react";

export default class AddTransaction extends Component {
  constructor(props) {
    super(props);
    this.nameRef = createRef();
    this.amountRef = createRef();
    this.transactionTypeRef = createRef();
  }

  submitTransaction(event) {
    event.preventDefault();

    let transaction = {
      name: this.nameRef.current.value,
      price: parseFloat(this.amountRef.current.value),
      transactionType: this.transactionTypeRef.current.value,
    };

    fetch("http://localhost:8080/api/v1/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    })
      .then((response) => response.json())
      .then(() => {
        window.location.reload();
      });
  }

  render() {
    return (
      <div className="flex justify-center items-center">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
          <h1 className="text-xl font-semibold text-gray-800 text-center pb-4">
            Add Transaction
          </h1>
          <form
            onSubmit={this.submitTransaction.bind(this)} className="space-y-6"
          >

            {/* Transaction Name */}
              <input
                type="text"
                id="name"
                ref={this.nameRef}
                className="w-full h-12 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Enter transaction name"
              />

            {/* Amount and Transaction Type */}
            <div className="grid grid-cols-2 gap-4 items-center">
              
              {/* Input for Amount */}
              <div className="space-y-2">
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-700"
                >
                  Amount
                </label>
                <input
                  type="number"
                  step="0.01"
                  id="amount"
                  ref={this.amountRef}
                  className="w-full h-12 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Enter amount"
                />
              </div>

              {/* Select for Transaction Type */}
              <div className="space-y-2">
                <label
                  htmlFor="transactionType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Type
                </label>
                <select
                  id="transactionType"
                  ref={this.transactionTypeRef}
                  className="w-full h-12 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-emerald-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-emerald-600 transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}