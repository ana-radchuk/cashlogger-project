import React, { Component, createRef } from "react";
import { DataContext } from "../DataContext";
import EmojiPicker from "emoji-picker-react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

export default class AddCategory extends Component {
  static contextType = DataContext;
  constructor(props) {
    super(props);
    this.category = props.category;
    this.carouselRef = createRef();
    this.state = {
      name: this.selectedCategory ? this.selectedCategory.name : "",
      showEmojiPicker: false,
      selectedEmoji: this.selectedCategory ? this.selectedCategory.emoji : "🚀",
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

  componentDidUpdate(prevProps, prevState) {
    if (
      JSON.stringify(prevState.categories) !==
      JSON.stringify(this.context.data)
    ) {
      fetch("http://localhost:8080/api/v1/categories")
        .then((response) => response.json())
        .then((data) => {
          if (JSON.stringify(prevState.categories) !== JSON.stringify(data)) {
            this.setState(
              {
                categories: data,
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

    if (this.state.name.trim() !== "") {
      let category = {
        name: this.state.name,
        emoji:
          this.state.selectedEmoji === "" ? "🚀" : this.state.selectedEmoji,
        type: this.state.categoryType,
      };

      if (this.state.selectedCategory) {
        fetch(
          `http://localhost:8080/api/v1/categories/${this.state.selectedCategory.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(category),
          }
        )
          .then((response) => {
            if (!response.ok) {
              if (response.status === 409) {
                this.setState({
                  notification: {
                    type: "error",
                    message: "Category already exists. Please try again.",
                  },
                });
              } else {
                this.setState({
                  notification: {
                    type: "error",
                    message: "Error updating category. Please try again.",
                  },
                });
              }
              throw new Error("Failed to update category");
            }

            var res = response.json();
            this.context.setData(res);
            this.setState({
              showSuccessNotification: true,
              showErrorNotification: false,
              notification: {
                type: "success",
                message: "Category successfully updated.",
              },
            });

            setTimeout(() => {
              this.setState({ showSuccessNotification: false });
            }, 3000);

            this.resetForm();
          })
          .catch(() => {
            this.setState({ showErrorNotification: true });

            setTimeout(() => {
              this.setState({ showErrorNotification: false });
            }, 3000);
          });
      } else {
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
                    message: "Category already exists. Please try again.",
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
            var res = response.json();
            this.context.setData(res);
            return res;
          })
          .then((newCategory) => {
            this.setState(
              (prevState) => ({
                categories: [...prevState.categories, newCategory],
                showSuccessNotification: true,
                showErrorNotification: false,
                notification: {
                  type: "success",
                  message: "New category successfully added!",
                },
              }),
              this.filterCategories
            );
            this.resetForm();

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
  }

  deleteCategory = (id) => {
    event.preventDefault();
    fetch(`http://localhost:8080/api/v1/categories/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        // TBD
      }
      this.context.setData(response);
      return response.text();
    });

    this.resetForm();
  };

  resetForm = () => {
    this.setState({
      name: "",
      selectedEmoji: "🚀",
      categoryType: "Expense",
      selectedCategory: null,
    });
  };

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

  setCategory = (category) => {
    this.setState((prevState) => {
      const isDeselecting = prevState.selectedCategory?.id === category.id;
      return {
        selectedCategory: isDeselecting ? null : category,
        name: isDeselecting ? "" : category.name,
        selectedEmoji: isDeselecting ? "🚀" : category.emoji,
      };
    });
  };

  handleToggle = () => {
    const newCategoryType =
      this.state.categoryType === "Expense" ? "Income" : "Expense";
    this.setState({ categoryType: newCategoryType }, this.filterCategories);
  };

  validateInput = () => {
    const value = this.state.name;
    this.setState({ showError: value.trim() == "" });
  };

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  render() {
    const { name, selectedCategory, categoryType, loading, error } = this.state;

    return (
      <div className="flex justify-center items-center">
        <div className={`w-full max-w-md bg-white rounded shadow-lg p-6`}>
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
                      className={`bg-gray-200 bg-opacity-70 rounded-lg h-10 w-full px-4 focus:outline-none focus:ring-0 focus:border-violet-500 text-gray-700  ${
                        this.state.showError ? "border-red-500" : ""
                      }`}
                      placeholder="Enter category"
                      onChange={this.handleNameChange}
                      value={name}
                    />

                    {/* Button for Emoji Picker */}
                    <button
                      type="button"
                      onClick={this.toggleEmojiPicker}
                      onMouseEnter={() => this.setState({ isHovered: true })}
                      onMouseLeave={() => this.setState({ isHovered: false })}
                      className={`flex-shrink-0 w-10 h-10 mr-2 ml-1 rounded-lg flex justify-center items-center 
                        ${
                          this.state.showEmojiPicker
                            ? "bg-gray-300"
                            : "bg-gray-200"
                        } 
                        ${
                          !this.state.showEmojiPicker && this.state.isHovered
                            ? "hover:bg-gray-300"
                            : ""
                        }`}
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
                  <div className="absolute z-10 mt-2 bg-white">
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
                            if (this.category) return;
                            e.preventDefault();
                            this.setCategory(category);
                          }}
                          disabled={this.category}
                          className={`text-gray-600 rounded-lg px-2 py-1 text-xs font-medium transition
                              ${
                                selectedCategory === category
                                  ? "bg-violet-500 text-white"
                                  : this.category
                                  ? "bg-gray-200 text-gray-600"
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

                  {!this.category &&
                    this.state.selectedCategory &&
                    this.state.filteredCategories.length > 0 && (
                      <button
                        onClick={() =>
                          this.deleteCategory(this.state.selectedCategory.id)
                        }
                        className="px-6 bg-gray-200 text-gray-600 rounded-lg flex items-center justify-center p-2 hover:bg-gray-300 transition"
                      >
                        <FaTimes />
                      </button>
                    )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full bg-violet-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-violet-600 transition"
              >
                {this.state.selectedCategory
                  ? "Update Category"
                  : "Add Category"}
              </button>

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
          </form>
        </div>
      </div>
    );
  }
}
