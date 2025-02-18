import React, { Component, createRef } from "react";
import {
  FaCalendarAlt,
  FaDollarSign,
  FaPlus,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
} from "react-icons/fa";
import AddCategory from "../category/AddCategory";

export default class AddTransaction extends Component {
  constructor(props) {
    super(props);
    this.nameRef = createRef();
    this.amountRef = createRef();
    this.dateRef = createRef();
    this.carouselRef = createRef();
    this.state = {
      transactionType: "Expense",
      selectedDateTime: new Date(),
      categories: [],
      filteredCategories: [],
      selectedCategory: null,
      loading: true,
      error: null,
      showAddCategory: false,
      isEditing: false,
      openDialog: false,
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  validateInput = () => {
    const value = this.nameRef.current.value;
    this.setState({ showError: value.trim() == "" });
  };

  openDialog = () => {
    this.setState({ dialogOpen: true });
  };

  closeDialog = () => {
    this.setState({ dialogOpen: false });
  };

  setTransactionType = (type) => {
    this.setState(
      {
        transactionType: type,
      },
      this.filterCategories
    );
  };

  filterCategories = () => {
    const { categories, transactionType } = this.state;
    const filteredCategories = categories.filter(
      (category) => category.categoryType === transactionType.toUpperCase()
    );

    this.setState({
      filteredCategories,
      selectedCategory:
        filteredCategories.length > 0 ? filteredCategories[0].id : null,
    });
  };

  fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/categories");
      if (!response.ok)
        throw new Error(`HTTP Error! Status: ${response.status}`);
      const data = await response.json();
      this.setState(
        {
          categories: data,
          selectedCategory: data.length > 0 ? data[0].id : null,
          loading: false,
        },
        this.filterCategories
      );
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };

  handleDateTimeChange = (event) => {
    this.setState({
      selectedDateTime: new Date(event.target.value),
      isEditing: false,
    });
  };

  toggleEditMode = (event) => {
    event.preventDefault();
    this.setState({ isEditing: true });
  };

  handleBlur = () => {
    this.setState({ isEditing: false });
  };

  setCategory = (categoryId) => {
    this.setState({ selectedCategory: categoryId });
  };

  openAddCategory = (event) => {
    event.preventDefault();
    this.setState({ showAddCategory: true });
  };

  handleDateTimeChange = (e) => {
    const newDate = new Date(e.target.value);
    if (!isNaN(newDate.getTime())) {
      this.setState({ selectedDateTime: newDate });
    }
  };

  formatDateTime = (date) => {
    return date.toLocaleString("en-CA", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  formatDateTimeForInput = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  handleAmountChange = (e) => {
    let value = e.target.value;

    // Allow only digits and one dot
    const regex = /^[0-9]*\.?[0-9]*$/;
    if (!regex.test(value)) {
      return; // Exit if the input contains invalid characters
    }

    // Allow only two decimal places
    if (value.includes(".")) {
      const [integerPart, decimalPart] = value.split(".");
      if (decimalPart.length > 2) {
        value = `${integerPart}.${decimalPart.substring(0, 2)}`;
      }
    }

    // Update the input field
    e.target.value = value;
  };

  scrollCarousel = (direction) => {
    if (this.carouselRef.current) {
      this.carouselRef.current.scrollBy({
        left: direction === "left" ? -100 : 100,
        behavior: "smooth",
      });
    }
  };

  closeAddCategory = () => {
    this.setState({ showAddCategory: false });
  };

  handleToggle = () => {
    const newTransactionType =
      this.state.transactionType === "Expense" ? "Income" : "Expense";
    this.setState(
      { transactionType: newTransactionType },
      this.filterCategories // Call this after setting the new type
    );
  };

  submitTransaction = (event) => {
    event.preventDefault();
    this.validateInput();

    if (this.nameRef.current.value.trim() !== "") {
    let transaction = {
      categoryId: parseInt(this.state.selectedCategory),
      name: this.nameRef.current.value,
      amount: parseFloat(this.amountRef.current.value),
      type: this.state.transactionType,
      createdAt: this.state.selectedDateTime.toISOString(),
    };

    console.log(transaction);

    fetch(
      `http://localhost:8080/api/v1/transactions?categoryId=${transaction.categoryId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transaction),
      }
    )
      .then((response) => response.json())
      .then(() => {
        window.location.reload();
      });
    }
  };

  render() {
    const {
      transactionType,
      selectedCategory,
      loading,
      error,
      showAddCategory,
      selectedDateTime,
      isEditing,
    } = this.state;

    return (
      <div className="z-10 relative flex justify-center items-center">
        {/* Main form container */}
        <div
          className={`w-full max-w-md bg-white rounded shadow-lg p-6 ${
            showAddCategory ? "opacity-50" : ""
          }`}
        >
          {/* Title */}
          <h1 className="text-xl font-semibold text-gray-700 text-center pb-4">
            Transaction Management
          </h1>

          <form onSubmit={this.submitTransaction} className="space-y-2">
            {/* Amount & Transaction Type */}
            <div className="flex space-x-4">
              <div className="w-2/3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>

                <div className="relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                    <FaDollarSign />
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    ref={this.amountRef}
                    className="w-full bg-opacity-70 h-10 pl-8 pr-4 bg-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-emerald-500 text-gray-700"
                    placeholder="0.00"
                    onChange={this.handleAmountChange}
                  />
                </div>
              </div>

              {/* Type Section */}
              <div className="w-1/3">
                <label className="block text-sm font-medium text-gray-700 ml-4">
                  Type
                </label>

                {/* Income toggle button */}
                <div className="flex h-12 border-gray-200 items-center justify-center gap-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={transactionType === "Income"}
                      onChange={this.handleToggle}
                    />
                    <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer-checked:bg-emerald-500 peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>

                  {/* Label for Income */}
                  <span
                    className={`text-xs font-semibold ${
                      transactionType === "Income"
                        ? "text-green-500"
                        : "text-gray-500"
                    }`}
                  >
                    Income
                  </span>
                </div>
              </div>
            </div>

            {/* Title: Transaction Name */}
            <div className="mr-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>

              <input
                type="text"
                ref={this.nameRef}
                className={`w-full px-4 bg-gray-200 bg-opacity-70 rounded-lg h-10 focus:outline-none focus:ring-0 focus:border-emerald-500 text-gray-700 ${
                  this.state.showError ? "border-red-500" : ""
                }`}
                placeholder="Enter transaction"
              />

              {/* Error message */}
              {this.state.showError && (
                <span className="text-red-500 text-xs">
                  Transaction title is required.
                </span>
              )}
            </div>

            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>

              {/* Category Carousel */}
              <div className="flex space-x-4">
                <div className="w-full flex items-center rounded-lg p-2">
                  <FaChevronLeft
                    onClick={() => this.scrollCarousel("left")}
                    className="text-gray-500 cursor-pointer mr-2"
                  />

                  <div
                    ref={this.carouselRef}
                    className="overflow-x-auto whitespace-nowrap flex space-x-2 w-full"
                  >
                    {loading ? (
                      <span className="text-gray-500">Loading...</span>
                    ) : error ? (
                      <span className="text-red-500">{error}</span>
                    ) : this.state.filteredCategories.length > 0 ? (
                      this.state.filteredCategories.map((category) => (
                        <button
                          key={category.id}
                          onClick={(e) => {
                            e.preventDefault();
                            this.setCategory(category.id);
                          }}
                          className={`text-gray-600 rounded-lg px-2 py-1 text-xs font-medium transition
                          ${
                            selectedCategory === category.id
                              ? "bg-emerald-500 text-white"
                              : "bg-gray-200 text-gray-600 hover:bg-gray-300 transition"
                          }
                          `}
                        >
                          <span className="text-lg mr-0.5">
                            {category.emoji}
                          </span>
                          <span className="text-xs">{category.name}</span>
                        </button>
                      ))
                    ) : (
                      <p className="text-gray-400 flex items-center justify-center h-full w-full text-center">
                        No categories available
                      </p>
                    )}
                  </div>

                  <FaChevronRight
                    onClick={() => this.scrollCarousel("right")}
                    className="text-gray-500 cursor-pointer ml-2 mr-4"
                  />

                  {/* Add Category Button */}
                  <button
                    onClick={this.openAddCategory}
                    className="px-6 bg-gray-200 text-gray-600 rounded-lg flex items-center justify-center p-2 hover:bg-gray-300 transition"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
            </div>

            {/* Date & Time Picker */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date & Time
              </label>

              <div className="flex items-center justify-between p-2 focus:outline-none focus:ring-0 focus:border-emerald-500">
                {/* Display DateTime */}
                {!isEditing ? (
                  <span className="text-gray-500">
                    {this.formatDateTime(selectedDateTime)}
                  </span>
                ) : (
                  <input
                    type="datetime-local"
                    onChange={this.handleDateTimeChange}
                    onBlur={this.handleBlur}
                    className="w-full h-10 p-2 bg-gray-200 bg-opacity-70 rounded-lg text-gray-500 placeholder-gray-400 focus:outline-none"
                    value={this.formatDateTimeForInput(selectedDateTime)}
                    autoFocus
                  />
                )}

                {/* Calendar Button */}
                {!isEditing && (
                  <button
                    onClick={this.toggleEditMode}
                    className="flex items-center space-x-2 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                  >
                    <FaCalendarAlt />
                  </button>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button className="w-full bg-emerald-500 text-white py-3 rounded-lg shadow-md hover:bg-emerald-600 transition">
              Add Transaction
            </button>
          </form>
        </div>

        {showAddCategory && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="relative p-4 rounded shadow-lg">
              {/* Close button placed absolutely within this container */}
              <button
                className="absolute -top-2 -right-2 text-gray-700 hover:text-gray-800"
                onClick={this.closeAddCategory}
              >
                <FaTimes size={20} />
              </button>

              {/* AddCategory content */}
              <AddCategory close={this.closeAddCategory} />
            </div>
          </div>
        )}
      </div>
    );
  }
}
