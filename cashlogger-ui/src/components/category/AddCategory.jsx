import React, { Component, createRef } from "react";
import EmojiPicker from "emoji-picker-react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaEdit,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

export default class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.nameRef = createRef();
    this.carouselRef = createRef();
    this.state = {
      showEmojiPicker: false,
      selectedEmoji: "",
      categoryType: "Expense",
      loading: true,
      categories: [],
      selectedCategory: null,
      filteredCategories: [],
      showError: false,
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

  fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/categories");
      if (!response.ok)
        throw new Error(`HTTP Error! Status: ${response.status}`);
      const data = await response.json();
      this.setState(
        {
          categories: data,
          loading: false,
        },
        this.filterCategories
      );
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };

  submitCategory(event) {
    event.preventDefault();
    this.validateInput();
  
    if (this.nameRef.current.value.trim() !== "") {
      let category = {
        name: this.nameRef.current.value,
        emoji: this.state.selectedEmoji === "" ? "🚀" : this.state.selectedEmoji,
        type: this.state.categoryType,
      };
  
      fetch("http://localhost:8080/api/v1/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      })
        .then((response) => {
          if (!response.ok) {
            if (response.status === 409) {
              this.setState({
                notification: {
                  type: "error",
                  message:
                    "Category with this name already exists. Please try again.",
                },
              });
            } else {
              this.setState({
                notification: {
                  type: "error",
                  message: "Error adding category. Please try again.",
                },
              });
            }
            throw new Error("Failed to add category");
          }
          return response.json();
        })
        .then((newCategory) => {
          this.setState(
            (prevState) => ({
              categories: [...prevState.categories, newCategory],
              showSuccessNotification: true,
              showErrorNotification: false,
            }),
            this.filterCategories
          );
  
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
  
  handleClickOutside = (event) => {
    this.setState({
      showError: false,
      showSuccessNotification: false,
      showErrorNotification: false,
    });
  };

  handleEmojiClick = (emoji) => {
    this.setState({ selectedEmoji: emoji.emoji, showEmojiPicker: false });
  };

  toggleEmojiPicker = (event) => {
    event.stopPropagation();
    this.setState((prevState) => ({
      showEmojiPicker: !prevState.showEmojiPicker,
      isHovered: false, // Reset hover state when opening the picker
    }));
  };

  openEditCategory = (event) => {
    event.preventDefault();
    this.setState({ showEditCategory: true });
  };

  filterCategories = () => {
    const { categories, categoryType } = this.state;
    const filteredCategories = categories.filter(
      (category) => category.categoryType === categoryType.toUpperCase()
    );
    this.setState({
      filteredCategories,
    });
  };

  scrollCarousel = (direction) => {
    if (this.carouselRef.current) {
      this.carouselRef.current.scrollBy({
        left: direction === "left" ? -100 : 100,
        behavior: "smooth",
      });
    }
  };

  setCategory = (categoryId) => {
    this.setState((prevState) => ({
      selectedCategory:
        prevState.selectedCategory === categoryId ? null : categoryId,
    }));
  };

  handleToggle = () => {
    const newCategoryType =
      this.state.categoryType === "Expense" ? "Income" : "Expense";
    this.setState(
      { categoryType: newCategoryType },
      this.filterCategories
    );
  };

  validateInput = () => {
    const value = this.nameRef.current.value;
    this.setState({ showError: value.trim() == "" });
  };

  render() {
    const { selectedCategory, categoryType, loading, error } = this.state;

    return (
      <div className="flex justify-center items-center">
        <div className="w-full max-w-md bg-white rounded shadow-lg p-6">
          <h1 className="text-xl font-semibold text-gray-700 text-center pb-4">
            Category Management
          </h1>

          <form onSubmit={this.submitCategory.bind(this)} className="space-y-2">
            <div className="flex space-x-2">
              {/* Input with Emoji Button */}
              <div className="w-2/3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title & Emoji
                </label>

                <div className="flex flex-col">
                  <div className="flex items-center h-10">
                    <input
                      type="text"
                      ref={this.nameRef}
                      className={`bg-gray-200 bg-opacity-70 rounded-lg h-10 w-full px-4 focus:outline-none focus:ring-0 focus:border-violet-500 text-gray-700  ${
                        this.state.showError ? "border-red-500" : ""
                      }`}
                      placeholder="Enter category"
                    />

                    {/* Button for Emoji Picker */}
                    <button
                      type="button"
                      onClick={this.toggleEmojiPicker}
                      onMouseEnter={() => this.setState({ isHovered: true })}
                      onMouseLeave={() => this.setState({ isHovered: false })}
                      className={`flex-shrink-0 w-10 h-10 mr-2 ml-1 rounded-lg flex justify-center items-center 
                        ${this.state.showEmojiPicker ? "bg-gray-300" : "bg-gray-200"} 
                        ${!this.state.showEmojiPicker && this.state.isHovered ? "hover:bg-gray-300" : "" }`}
                    >
                      {this.state.selectedEmoji || "🚀"}
                    </button>
                  </div>

                  {/* Error message */}
                  {this.state.showError && (
                    <span className="text-red-500 text-xs mt-1">
                      Category name is required.
                    </span>
                  )}
                </div>

                {/* Emoji Picker */}
                {this.state.showEmojiPicker && (
                  <div
                    className="absolute z-10 mt-2 bg-white"
                  >
                    <EmojiPicker onEmojiClick={this.handleEmojiClick} />
                  </div>
                )}
              </div>

              {/* Category Type buttons */}
              <div className="w-1/3">
                <label className="block text-sm font-medium text-gray-700 ml-4">
                  Type
                </label>

                {/* Income toggle button */}
                <div className="flex h-12 border-gray-200 items-center justify-center gap-2">
                  {/* <div className="flex items-center gap-1"> */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={categoryType === "Income"}
                      onChange={this.handleToggle}
                    />
                    <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer-checked:bg-emerald-500 peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>

                  {/* Label for Income */}
                  <span
                    className={`text-xs font-semibold ${
                      categoryType === "Income"
                        ? "text-green-500"
                        : "text-gray-500"
                    }`}
                  >
                    Income
                  </span>
                </div>
              </div>
            </div>

            {/* Categories section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Existing categories
              </label>

              <div className="flex space-x-4">
                {/* Category Carousel */}
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
                                ? "bg-violet-500 text-white"
                                : "bg-gray-200 text-gray-600 hover:bg-gray-300 transition"
                            }`}
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

                  {/* Edit Category Button */}
                  <button
                    onClick={this.openEditCategory}
                    className="w-1/4 bg-gray-200 text-gray-600 rounded-lg flex items-center justify-center p-2 hover:bg-gray-300 transition"
                  >
                    <FaEdit />
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full bg-violet-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-violet-600 transition"
              >
                Add Category
              </button>

              {this.state.showSuccessNotification && (
                <div className="z-10 fixed top-4 right-4 border bg-white border-green-500 text-gray-700 py-2 px-4 rounded-lg shadow-md flex items-center space-x-2">
                  <FaCheckCircle className="text-green-500" size={20} />
                  <span>New category successfully added!</span>
                </div>
              )}

              {this.state.showErrorNotification && (
                <div className="z-10 fixed top-4 right-4 border bg-white border-red-500 text-gray-700 py-2 px-4 rounded-lg shadow-md flex items-center space-x-2">
                  <FaTimesCircle className="text-red-500" size={20} />
                  <span>{this.state.notification.message}</span>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }
}
