import React, { Component, createRef } from 'react';

export default class AddCategory extends Component {
    constructor(props) {
        super(props);
        this.nameRef = createRef();
    }

    submitCategory(event) {
        event.preventDefault();

        let category = {
            name: this.nameRef.current.value 
        };

        fetch("http://localhost:8080/api/v1/categories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(category),
        })
        .then(response => response.json());

        window.location.reload();
    }

    render() {
        return (
            <div className="flex justify-center items-center">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
                    <h1 className="text-xl font-semibold text-gray-800 text-center pb-2">
                        Add Category
                    </h1>
                    <form onSubmit={this.submitCategory.bind(this)} className="space-y-4">
                        <div>
                            <input
                                type="text"
                                id="name"
                                ref={this.nameRef}
                                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Enter category name"
                            />
                        </div>
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-600 transition"
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