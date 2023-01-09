import React from 'react';
import '../Input.css';

const Input = ({ type, name, value, handleChange, placeholder }) => {
  return (
    <div className="Input">
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
