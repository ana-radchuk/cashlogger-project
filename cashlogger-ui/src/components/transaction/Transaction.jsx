import React, { Component } from "react";
import { DataContext } from "../DataContext";
import SingleTransaction from "./SingleTransaction";
import {
    FaArrowLeft,
    FaArrowRight,
  } from "react-icons/fa";

export default class Transaction extends Component {
  static contextType = DataContext;
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      currentPage: 1,
      transactionsPerPage: 5,
    };
  }

  componentDidMount() {
    this.fetchTransactions();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      JSON.stringify(prevState.transactions) !==
      JSON.stringify(this.context.data)
    ) {
      this.fetchTransactions();
    }
  }

  fetchTransactions = () => {
    fetch("http://localhost:8080/api/v1/transactions")
      .then((response) => response.json())
      .then((data) => this.setState({ transactions: data }));
  };

  handlePageChange = (newPage) => {
    this.setState({ currentPage: newPage });
  };

  render() {
    const { transactions, currentPage, transactionsPerPage } = this.state;
    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    const currentTransactions = transactions.slice(
      indexOfFirstTransaction,
      indexOfLastTransaction
    );

    const totalPages = Math.ceil(transactions.length / transactionsPerPage);

    return (
      <div className="relative flex justify-center items-center">
        <div className="w-full max-w-md bg-white rounded shadow-lg p-6">
          <h1 className="text-xl font-semibold text-gray-700 text-center pb-4">
            Existing Transactions
          </h1>

          {currentTransactions.length > 0 ? (
            <div className="w-full grid grid-cols-1 gap-4">
              {currentTransactions.map((transaction) => (
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

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4 space-x-2">
            <button
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 transition hover:bg-gray-400 disabled:hover:bg-gray-300"
              onClick={() => this.handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FaArrowLeft />
            </button>
            <span className="px-4 py-2 text-xs">Page {currentPage} of {totalPages}</span>
            <button
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 transition hover:bg-gray-400 disabled:hover:bg-gray-300"
              onClick={() => this.handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    );
  }
}
