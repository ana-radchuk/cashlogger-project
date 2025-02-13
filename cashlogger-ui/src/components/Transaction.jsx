import React, { Component } from 'react';
import SingleTransaction from './transaction/SingleTransaction';
import AddTransaction from './transaction/AddTransaction';

export default class Transaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: [],
        };
    }

    componentDidMount() {
        fetch('http://localhost:8080/api/v1/transactions')
            .then((response) => response.json())
            .then((data) => this.setState({ transactions: data }));
    }

    render() {
        return (
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
                    {/* <h1 className="text-3xl font-bold text-center text-emerald-600 mb-6">Transaction Management</h1> */}
                    
                    {/* Add Transaction Section */}
                    <div className="mb-8">
                        <AddTransaction />   
                    </div>

                    {/* Display Transaction Section */}
                    <div>
                    <h1 className="text-xl font-semibold text-gray-800 text-center pb-4">Existing Transactions</h1>

                        {this.state.transactions.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {this.state.transactions.map((transaction) => (
                                    <SingleTransaction key={transaction.id} transaction={transaction} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600 text-center">No transactions available. Add one above!</p>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}