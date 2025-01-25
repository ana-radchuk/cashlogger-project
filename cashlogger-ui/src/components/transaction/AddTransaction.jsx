import React, { Component, createRef } from "react";

export default class AddTransaction extends Component {
    constructor(props) {
        super(props);
        this.nameRef = createRef();
    }

    submitTransaction(event) {
        event.preventDefault();

        let transaction = {
            name: this.nameRef.current.value,
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
                  <h1 className="text-xl font-semibold text-gray-800 text-center pb-2">
                    Add Transaction
                  </h1>
                  <form onSubmit={this.submitTransaction.bind(this)} className="space-y-4">
                     {/* Transaction Information */}
                     <div className="flex items-center">
                      {/* Input for Transaction Name */}
                      <input
                        type="text"
                        id="name"
                        ref={this.nameRef}
                        className="flex-grow h-12 px-4 py-2 border border-gray-300 rounded-l-lg shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="Enter transaction name"
                      />
 
                    </div>
        
        
                    {/* Submit Button */}
                    <div className="flex justify-center">
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
