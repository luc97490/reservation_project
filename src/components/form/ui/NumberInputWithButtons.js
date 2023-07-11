import React from "react";

const NumberInput = ({ value, onChange }) => {
  const handleInputChange = (event) => {
    const inputValue = event.target.value;

    if (/^\d*$/.test(inputValue)) {
      onChange(inputValue);
    }
  };

  const inputStyle = {
    width: `${value.length ? 1.7 + value.length * 1 : 1.7 + 1 * 1}ch`,
  };
  return (
    <input
      type="text"
      inputMode
      pattern="[0-9]*"
      value={value}
      onChange={handleInputChange}
      min="1"
      style={inputStyle}
      className="border-t border-b border-transparent focus:border-gray-300 px-2 py-1 flex-grow outline-none"
    />
  );
};
export default function NumberInputWithButtons({ value, onChange }) {
  const incrementValue = () => {
    onChange((prevValue) => {
      const newValue = parseInt(prevValue) + 1;
      return isNaN(newValue) ? 1 : String(newValue);
    });
  };

  const decrementValue = () => {
    onChange((prevValue) => {
      const newValue = parseInt(prevValue) - 1;
      return isNaN(newValue) || newValue < 1 ? 1 : String(newValue);
    });
  };

  return (
    <div>
      <button
        type="button"
        onClick={decrementValue}
        className="px-2 py-1 rounded-l-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none"
      >
        -
      </button>
      <NumberInput value={value} onChange={onChange} />
      <button
        type="button"
        onClick={incrementValue}
        className="px-2 py-1 rounded-r-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none"
      >
        +
      </button>
    </div>
  );
}
