import React from 'react';

const SingleTransaction = ({ transaction }) => {

    return (
        <div className="flex items-center space-x-4 bg-white border border-gray-300 rounded-lg shadow-md p-4 hover:shadow-lg transition transform hover:scale-105">
            <div>
                <p className="text-lg font-semibold text-gray-800">{transaction.name}</p>
            </div>
        </div>
    );
};

export default SingleTransaction;