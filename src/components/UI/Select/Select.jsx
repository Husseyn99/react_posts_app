import React from "react";

const Select = ({ option, defaultValue, value, onChange }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option disabled>{defaultValue}</option>
      {option.map((option) => {
        return (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
