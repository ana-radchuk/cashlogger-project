import React from 'react';

const SingleCategory = ({ category }) => {
    const emoji = category.emoji || "🚀";

    return (
        <div className="flex items-center space-x-4 bg-white border border-gray-300 rounded-lg shadow-md p-4 hover:shadow-lg transition transform hover:scale-105">
            <div className="text-3xl">{emoji}</div>
            <div>
                <p className="text-lg font-semibold text-gray-800">{category.name}</p>
            </div>
        </div>
    );
};

export default SingleCategory;