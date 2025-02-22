import React, { Component } from "react";
import { DataContext } from "../DataContext";
import SingleTransaction from "./SingleTransaction";

export default class Transaction extends Component {
  static contextType = DataContext;
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/api/v1/transactions")
      .then((response) => response.json())
      .then((data) => this.setState({ transactions: data }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      JSON.stringify(prevState.transactions) !==
      JSON.stringify(this.context.data)
    ) {
      fetch("http://localhost:8080/api/v1/transactions")
        .then((response) => response.json())
        .then((data) => {
          if (JSON.stringify(prevState.transactions) !== JSON.stringify(data)) {
            this.setState({ transactions: data });
          }
        });
    }
  }

  render() {
    return (
      <div className="relative flex justify-center items-center">
        <div className="w-full max-w-md bg-white rounded shadow-lg p-6">
          {/* Display Transaction Section */}
          <h1 className="text-xl font-semibold text-gray-700 text-center pb-4">
            Existing Transactions
          </h1>

          {this.state.transactions != null &&
          this.state.transactions.length > 0 ? (
            <div className="w-full grid grid-cols-1 gap-4">
              {this.state.transactions.map((transaction) => (
                <SingleTransaction
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center">
              No transactions available
            </p>
          )}
        </div>
      </div>
    );
  }
}
