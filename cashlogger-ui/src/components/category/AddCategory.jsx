import React, { Component, createRef } from "react";
import EmojiPicker from "emoji-picker-react";

export default class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEmojiPicker: false,
      selectedEmoji: "",
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
    this.setState((prevState) => ({ showEmojiPicker: !prevState.showEmojiPicker }));
  };

  submitCategory(event) {
    event.preventDefault();

    let category = {
      name: this.nameRef.current.value, 
      emoji: this.state.selectedEmoji,
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
    const { showEmojiPicker, selectedEmoji } = this.state;

    return (
      <div className="flex justify-center items-center">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
          <h1 className="text-xl font-semibold text-gray-800 text-center pb-2">
            Add Category
          </h1>
          <form onSubmit={this.submitCategory.bind(this)} className="space-y-4">
             {/* Category Name and Emoji Picker Combined */}
             <div className="flex items-center">
              {/* Input for Category Name */}
              <input
                type="text"
                id="name"
                ref={this.nameRef}
                className="flex-grow h-12 px-4 py-2 border border-gray-300 rounded-l-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter category name"
              />
              {/* Button for Emoji Picker */}
              <button
                type="button"
                onClick={this.toggleEmojiPicker}
                className="flex-shrink-0 w-12 h-12 bg-gray-50 border border-gray-300 rounded-r-lg flex justify-center items-center shadow-sm hover:bg-gray-100 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {selectedEmoji || "🚀"}
              </button>
              {showEmojiPicker && (
                <div
                  ref={this.emojiPickerRef}
                  className="absolute z-10 mt-20 bg-white border border-gray-300 rounded-lg shadow-lg"
                >
                  <EmojiPicker onEmojiClick={this.handleEmojiClick} />
                </div>
              )}
            </div>


            {/* Submit Button */}
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