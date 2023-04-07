import React from "react";

const Key = ({ button, handleButtonClick }) => {
  return (
    <button
      type="button"
      className={button.class}
      value={button.value}
      onClick={() => handleButtonClick(button.value, button.type)}
    >
      {button.label}
    </button>
  );
};

export default Key;
