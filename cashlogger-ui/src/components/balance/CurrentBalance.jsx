import React, { Component } from "react";
import { FaChevronDown, FaDollarSign, FaArrowDown } from "react-icons/fa";

class CurrentBalance extends Component {
  constructor(props) {
    super(props);
    this.months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const currentMonth = new Date().getMonth();
    const previousMonth = new Date().getMonth() - 1;
    this.state = {
      showCurrentDropdown: false,
      selectedCurrentMonth: this.months[currentMonth],
      showPreviousDropdown: false,
      selectedPreviousMonth: this.months[previousMonth],
    };
  }

  toggleCurrentDropdown = () => {
    this.setState((prevState) => ({
      showCurrentDropdown: !prevState.showCurrentDropdown,
    }));
  };

  togglePreviousDropdown = () => {
    this.setState((prevState) => ({
      showPreviousDropdown: !prevState.showPreviousDropdown,
    }));
  };

  handleCurrentMonthSelect = (month) => {
    this.setState({ selectedCurrentMonth: month, showCurrentDropdown: false });
  };

  handlePreviousMonthSelect = (month) => {
    this.setState({
      selectedPreviousMonth: month,
      showPreviousDropdown: false,
    });
  };

  render() {
    const {
      showCurrentDropdown,
      selectedCurrentMonth,
      showPreviousDropdown,
      selectedPreviousMonth,
    } = this.state;

    return (
      <div className="relative flex justify-center items-center">
        <div className="w-full max-w-md bg-white p-6 shadow-lg rounded">
          {/* Title */}
          <h1 className="text-xl font-semibold text-gray-700 text-center pb-4">
            Current Balance
          </h1>

          {/* First row: months picker */}
          <div className="relative flex items-center gap-6">
            {/* Current month box */}
            <div className="w-1/2 mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Month
              </label>
              <div
                className="flex items-center justify-between bg-gray-200 rounded-lg bg-opacity-70 px-4 py-2 cursor-pointer text-gray-700 hover:bg-gray-300"
                onClick={this.toggleCurrentDropdown}
              >
                <span>{selectedCurrentMonth}</span>
                <FaChevronDown className="text-gray-500" />
              </div>
              {showCurrentDropdown && (
                <ul className="absolute bg-white border rounded-lg shadow-sm mt-1 w-1/2 z-10">
                  {this.months.map((month) => (
                    <li
                      key={month}
                      onClick={() => this.handleCurrentMonthSelect(month)}
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-gray-700"
                    >
                      {month}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Previous month box */}
            <div className="w-1/2 mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Previous Month
              </label>
              <div
                className="flex items-center justify-between bg-gray-200 rounded-lg bg-opacity-70 px-4 py-2 cursor-pointer text-gray-700 hover:bg-gray-300"
                onClick={this.togglePreviousDropdown}
              >
                <span>{selectedPreviousMonth}</span>
                <FaChevronDown className="text-gray-500" />
              </div>
              {showPreviousDropdown && (
                <ul className="absolute bg-white border rounded-lg shadow-sm mt-1 w-1/2 z-10">
                  {this.months.map((month) => (
                    <li
                      key={month}
                      onClick={() => this.handlePreviousMonthSelect(month)}
                      className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-gray-700"
                    >
                      {month}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Second row: income & expenses info */}
          <div className="flex items-center gap-6">
            {/* For current month */}
            <div className="w-1/2 flex items-center gap-2">
              {/* Income for current month section */}
              <div className="w-1/2">
                <div className="flex items-center bg-opacity-70 rounded-lg px-2 py-2">
                  <span className="text-emerald-500 mr-2">
                    <FaDollarSign />
                  </span>
                  <input
                    disabled
                    type="text"
                    value="0.00"
                    className="w-full bg-transparent text-left text-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Income for previous month section */}
              <div className="w-1/2">
                <div className="flex items-center bg-opacity-70 rounded-lg px-2 py-2">
                  <span className="text-red-500 mr-2">
                    <FaDollarSign />
                  </span>
                  <input
                    disabled
                    type="text"
                    value="0.00"
                    className="w-full bg-transparent text-left text-red-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* For previous month */}
            <div className="w-1/2 flex items-center gap-2">
              {/* Income for previous month */}
              <div className="w-1/2">
                <div className="flex items-center bg-opacity-70 rounded-lg px-2 py-2">
                  <span className="text-emerald-500 mr-2">
                    <FaDollarSign />
                  </span>
                  <input
                    disabled
                    type="text"
                    value="0.00"
                    className="w-full bg-transparent text-left text-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Expenses for previous month */}
              <div className="w-1/2">
                <div className="flex items-center bg-opacity-70 rounded-lg px-2 py-2">
                  <span className="text-red-500 mr-2">
                    <FaDollarSign />
                  </span>
                  <input
                    disabled
                    type="text"
                    value="0.00"
                    className="w-full bg-transparent text-left text-red-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Third row: total info */}
          <div className="relative flex items-center gap-6 mt-4">
            {/* Current month box */}
            <div className="w-1/2">
              <div className="flex items-center">
                <div className="flex items-center bg-opacity-70 rounded-lg px-2 py-2">
                  <span className="text-gray-500 mr-2">
                    <FaDollarSign />
                  </span>
                  <input
                    disabled
                    type="text"
                    placeholder="0.00"
                    className="w-full bg-transparent text-gray-700 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Previous month box */}
            <div className="w-1/2">
              <div className="flex items-center">
                <div className="flex items-center bg-opacity-70 rounded-lg px-2 py-2">
                  <span className="text-gray-500 mr-2">
                    <FaDollarSign />
                  </span>
                  <input
                    disabled
                    type="text"
                    placeholder="0.00"
                    className="w-full bg-transparent text-gray-700 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CurrentBalance;