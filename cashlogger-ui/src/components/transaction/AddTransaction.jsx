import React, { Component, createRef } from "react";
import { DataContext } from "../DataContext";
import {
  FaCalendarAlt,
  FaDollarSign,
  FaPlus,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import AddCategory from "../category/AddCategory";

export default class AddTransaction extends Component {
  static contextType = DataContext;

  constructor(props) {
    super(props);
    this.transaction = props.transaction;
    this.carouselRef = createRef();
    this.state = {
      name: this.transaction ? this.transaction.name : "",
      amount: this.transaction
        ? this.formatAmount(this.transaction.amount)
        : "",
      transactionType: this.transaction
        ? this.transaction.transactionType
        : "EXPENSE",
      selectedDateTime: this.transaction
        ? new Date(this.transaction.createdAt)
        : new Date(),
      categories: [],
      filteredCategories: [],
      selectedCategory: null,
      loading: true,
      error: null,
      showAddCategory: false,
      isEditing: false,
      showSuccessNotification: false,
      showErrorNotification: false,
      notification: {},
    };
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside);
    this.fetchCategories();
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      JSON.stringify(prevState.transactions) !==
      JSON.stringify(this.context.data)
    ) {
      fetch("http://localhost:8080/api/v1/categories")
        .then((response) => response.json())
        .then((data) => {
          if (JSON.stringify(prevState.categories) !== JSON.stringify(data)) {
            this.setState(
              {
                categories: data,
                selectedCategory: data.length > 0 ? data[0].id : null,
                loading: false,
              },
              this.filterCategories
            );
          }
        });
    }
  }

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

  submitTransaction = (event) => {
    event.preventDefault();
    this.validateInput();

    if (
      this.state.name.trim() !== "" &&
      !isNaN(parseInt(this.state.selectedCategory))
    ) {
      let transaction = {
        categoryId: parseInt(this.state.selectedCategory),
        name: this.state.name,
        amount: parseFloat(this.state.amount),
        type: this.state.transactionType,
        createdAt: this.state.selectedDateTime.toISOString(),
      };

      if (this.transaction) {
        fetch(
          `http://localhost:8080/api/v1/transactions/${this.transaction.id}?categoryId=${transaction.categoryId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(transaction),
          }
        )
        .then((response) => {
          if (!response.ok) {
            this.setState({
              notification: {
                type: "error",
                message: "Error updating category. Please try again.",
              },
            });
            throw new Error("Failed to update category");
          }

          this.context.setData(response.json());
          this.setState({
            notification: {
              type: "success",
              message: "Transaction successfully updated!",
            },
            showSuccessNotification: true,
            showErrorNotification: false,
          });

          setTimeout(() => {
            this.setState({ showSuccessNotification: false });
          }, 3000);
        })
        .catch(() => {
          this.setState({ showErrorNotification: true });

          setTimeout(() => {
            this.setState({ showErrorNotification: false });
          }, 3000);
        });
      } else {
        fetch(
          `http://localhost:8080/api/v1/transactions?categoryId=${transaction.categoryId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(transaction),
          }
        )
          .then((response) => {
            if (!response.ok) {
              this.setState({
                notification: {
                  type: "error",
                  message: "Error adding transaction. Please try again.",
                },
              });
              throw new Error("Failed to add transaction");
            }

            this.context.setData(response.json());
            this.setState({
              notification: {
                type: "success",
                message: "New transaction successfully added!",
              },
              showSuccessNotification: true,
              showErrorNotification: false,
            });

            setTimeout(() => {
              this.setState({ showSuccessNotification: false });
            }, 3000);
          })
          .catch(() => {
            this.setState({ showErrorNotification: true });

            setTimeout(() => {
              this.setState({ showErrorNotification: false });
            }, 3000);
          });
      }
    }
  };

  validateInput = () => {
    const nameValue = this.state.name;
    const categoryValue = parseInt(this.state.selectedCategory);
    this.setState({
      showInputError: nameValue.trim() == "",
      showCategoryError: isNaN(categoryValue),
    });
  };

  openAddCategory = (event) => {
    event.preventDefault();
    this.setState({ showAddCategory: true });
  };

  closeAddCategory = () => {
    this.setState({ showAddCategory: false });
  };

  filterCategories = () => {
    const { categories, transactionType } = this.state;
    const filteredCategories = categories.filter(
      (category) => category.categoryType === transactionType.toUpperCase()
    );

    let idx = 0;
    if (this.transaction) {
      for (let i = 0; i < filteredCategories.length; i++) {
        if (filteredCategories[i].id === this.transaction.category.id) {
          idx = i;
          break;
        }
      }
    }

    this.setState({
      filteredCategories,
      selectedCategory: this.transaction
        ? filteredCategories[idx].id
        : filteredCategories.length > 0
        ? filteredCategories[0].id
        : null,
    });
  };

  handleClickOutside = (event) => {
    this.setState({
      showInputError: false,
      showCategoryError: false,
      showSuccessNotification: false,
      showErrorNotification: false,
    });
  };

  handleDateTimeChange = (e) => {
    const newDate = new Date(e.target.value);
    if (!isNaN(newDate.getTime())) {
      this.setState({
        selectedDateTime: newDate,
      });
    }
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

  formatAmount = (amount) => {
    if (!amount.toString().includes(".")) {
      return amount + ".00";
    }
    return amount;
  };

  handleAmountChange = (e) => {
    let value = e.target.value;

    const regex = /^[0-9]*\.?[0-9]*$/;
    if (!regex.test(value)) {
      return;
    }

    if (value.includes(".")) {
      const [integerPart, decimalPart] = value.split(".");
      if (decimalPart.length > 2) {
        value = `${integerPart}.${decimalPart.substring(0, 2)}`;
      }
    }

    this.setState({ amount: value });
  };

  scrollCarousel = (direction) => {
    if (this.carouselRef.current) {
      this.carouselRef.current.scrollBy({
        left: direction === "left" ? -100 : 100,
        behavior: "smooth",
      });
    }
  };

  handleToggle = () => {
    const newTransactionType =
      this.state.transactionType.toUpperCase() === "EXPENSE"
        ? "INCOME"
        : "EXPENSE";
    this.setState(
      { transactionType: newTransactionType },
      this.filterCategories
    );
  };

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  render() {
    const {
      amount,
      name,
      transactionType,
      selectedCategory,
      loading,
      error,
      showAddCategory,
      selectedDateTime,
      isEditing,
    } = this.state;

    return (
      <div className="relative flex justify-center items-center">
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
                    className="w-full bg-opacity-70 h-10 pl-8 pr-4 bg-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-emerald-500 text-gray-700"
                    placeholder="0.00"
                    onChange={this.handleAmountChange}
                    value={amount}
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
                      checked={transactionType === "INCOME"}
                      onChange={this.handleToggle}
                    />
                    <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer-checked:bg-emerald-500 peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>

                  {/* Label for Income */}
                  <span
                    className={`text-xs font-semibold ${
                      transactionType === "INCOME"
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
                className={`w-full px-4 bg-gray-200 bg-opacity-70 rounded-lg h-10 focus:outline-none focus:ring-0 focus:border-emerald-500 text-gray-700 ${
                  this.state.showInputError ? "border-red-500" : ""
                }`}
                placeholder="Enter transaction"
                onChange={this.handleNameChange}
                value={name}
              />

              {/* Error message */}
              {this.state.showInputError && (
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
                    className={`overflow-x-auto whitespace-nowrap flex space-x-2 w-full ${
                      this.state.showInputError ? "border-red-500" : ""
                    }`}
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

                  {!this.transaction && (
                    <button
                      onClick={this.openAddCategory}
                      className="px-6 bg-gray-200 text-gray-600 rounded-lg flex items-center justify-center p-2 hover:bg-gray-300 transition"
                    >
                      <FaPlus />
                    </button>
                  )}
                </div>
              </div>

              {/* Error message */}
              {this.state.showCategoryError && (
                <span className="text-red-500 text-xs">
                  Category is required.
                </span>
              )}
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
              {this.transaction != null
                ? "Update Transaction"
                : "Add Transaction"}
            </button>
          </form>
        </div>

        {showAddCategory && (
          <div className="z-10 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="relative p-4 rounded shadow-lg">
              {/* Close button placed absolutely within this container */}
              <button
                className="absolute -top-2 -right-2 text-gray-700 hover:text-gray-800"
                onClick={this.closeAddCategory}
              >
                <FaTimes size={20} />
              </button>

              {/* AddCategory content */}
              <AddCategory
                category={selectedCategory} 
                close={this.closeAddCategory} 
              />
            </div>
          </div>
        )}

        {this.state.showSuccessNotification && (
          <div className="z-10 fixed top-4 right-4 border bg-white border-green-500 text-gray-700 py-2 px-4 rounded-lg shadow-md flex items-center space-x-2">
            <FaCheckCircle className="text-green-500" size={20} />
            <span>{this.state.notification.message}</span>
          </div>
        )}

        {this.state.showErrorNotification && (
          <div className="z-10 fixed top-4 right-4 border bg-white border-red-500 text-gray-700 py-2 px-4 rounded-lg shadow-md flex items-center space-x-2">
            <FaTimesCircle className="text-red-500" size={20} />
            <span>{this.state.notification.message}</span>
          </div>
        )}
      </div>
    );
  }
}
