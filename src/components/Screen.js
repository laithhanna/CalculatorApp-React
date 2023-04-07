import React from "react";

const Screen = ({ displayValue }) => {
  return (
    <input
      type="text"
      className="calculator-screen"
      value={displayValue}
      disabled
    />
  );
};

export default Screen;
