import React from "react";

export const Select = ({ name, value, onChange, options = [], placeholder = "", ...rest }) => (
  <select
    name={name}
    value={value}
    onChange={onChange}
    className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    {...rest}
  >
    <option value="">{placeholder}</option>
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);
