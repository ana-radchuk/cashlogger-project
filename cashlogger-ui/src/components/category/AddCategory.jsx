import React, { Component, createRef } from "react";
import EmojiPicker from "emoji-picker-react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export default class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEmojiPicker: false,
      selectedEmoji: "",
      categoryType: "Expense",
    };
    this.nameRef = createRef();
    this.emojiPickerRef = createRef();
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (
      this.emojiPickerRef.current &&
      !this.emojiPickerRef.current.contains(event.target)
    ) {
      this.setState({ showEmojiPicker: false });
    }
  };

  handleEmojiClick = (emoji) => {
    this.setState({ selectedEmoji: emoji.emoji, showEmojiPicker: false });
  };

  toggleEmojiPicker = () => {
    event.stopPropagation();
    this.setState((prevState) => ({
      showEmojiPicker: !prevState.showEmojiPicker,
    }));
  };

  setCategoryType = (type) => {
    this.setState({
      categoryType: type,
    });
  };

  submitCategory(event) {
    event.preventDefault();

    let category = {
      name: this.nameRef.current.value,
      emoji: this.state.selectedEmoji,
      type: this.state.categoryType,
    };

    fetch("http://localhost:8080/api/v1/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    })
      .then((response) => response.json())
      .then(() => {
        window.location.reload();
      });
  }

  render() {
    const { showEmojiPicker, selectedEmoji, categoryType } = this.state;

    return (
      <div className="flex justify-center items-center">
        <div className="w-full max-w-md bg-white rounded shadow-lg p-6">
          <h1 className="text-xl font-semibold text-gray-700 text-center pb-4">
            Category Management
          </h1>

          <form onSubmit={this.submitCategory.bind(this)} className="space-y-6">
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title & Emoji
                </label>

                {/* Input with Emoji Button */}
                <div className="flex items-center">
                  <input
                    type="text"
                    ref={this.nameRef}
                    className="w-full h-12 px-4 border-b shadow-sm focus:outline-none focus:ring-0 focus:border-violet-500 text-gray-700"
                    placeholder="Enter category"
                  />

                  {/* Button for Emoji Picker */}
                  <button
                    type="button"
                    onClick={this.toggleEmojiPicker}
                    className="flex-shrink-0 w-12 h-12 border-b border-l shadow-sm flex justify-center items-center hover:bg-gray-200"
                  >
                    {this.state.selectedEmoji || "🚀"}
                  </button>
                </div>

                {/* Emoji Picker */}
                {this.state.showEmojiPicker && (
                  <div
                    ref={this.emojiPickerRef}
                    className="absolute z-10 mt-2 bg-whit"
                  >
                    <EmojiPicker onEmojiClick={this.handleEmojiClick} />
                  </div>
                )}
              </div>

              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>

                <div className="flex p-1 h-12 border-b border-gray-300 shadow-sm gap-1">
                  <button
                    type="button"
                    onClick={() => this.setCategoryType("Expense")}
                    className={`flex-1 px-2 py-1 text-xs rounded-lg transition ${
                      categoryType === "Expense"
                        ? "bg-red-500 text-white"
                        : "bg-gray-200 text-gray-600 hover:bg-gray-300 transition"
                    }`}
                  >
                    <FaArrowUp className="text-xs" /> Expense
                  </button>
                  <button
                    type="button"
                    onClick={() => this.setCategoryType("Income")}
                    className={`flex-1 px-2 py-1 text-xs rounded-lg transition ${
                      categoryType === "Income"
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-600 hover:bg-gray-300 transition"
                    }`}
                  >
                    <FaArrowDown className="text-xs" /> Income
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
            </div>
          </form>
        </div>
      </div>
    );
  }
}
