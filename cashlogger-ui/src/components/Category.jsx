import React, { Component } from 'react';
import SingleCategory from './category/SingleCategory';
import AddCategory from './category/AddCategory';

export default class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
        };
    }

    componentDidMount() {
        fetch('http://localhost:8080/api/v1/categories')
            .then((response) => response.json())
            .then((data) => this.setState({ categories: data }));
    }

    render() {
        return (
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
                    <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">Category Management</h1>
                    
                    {/* Add Category Section */}
                    <div className="mb-8">
                        <AddCategory />   
                    </div>

                    {/* Display Categories Section */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Existing Categories</h2>
                        {this.state.categories.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {this.state.categories.map((category) => (
                                    <SingleCategory key={category.id} category={category} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600 text-center">No categories available. Add one above!</p>
                        )}
                    </div>
                    
                </div>
            </div>
        );
    }
}