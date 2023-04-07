import React, { useState } from "react";
import Key from "./Key";
import Screen from "./Screen";

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState("0");
  const [firstOperand, setFirstOperand] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [operator, setOperator] = useState(null);

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplayValue(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === "0" ? digit : displayValue + digit);
    }
  };

  const inputDecimal = (dot) => {
    if (waitingForSecondOperand) {
      setDisplayValue("0.");
      setWaitingForSecondOperand(false);
    } else if (!displayValue.includes(dot)) {
      setDisplayValue(displayValue + dot);
    }
  };

  const calculate = (firstOperand, secondOperand, operator) => {
    switch (operator) {
      case "+":
        return firstOperand + secondOperand;
      case "-":
        return firstOperand - secondOperand;
      case "*":
        return firstOperand * secondOperand;
      case "/":
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (operator && waitingForSecondOperand) {
      setOperator(nextOperator);
      return;
    }

    if (firstOperand === null && !isNaN(inputValue)) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplayValue(`${parseFloat(result.toFixed(7))}`);
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const resetCalculator = () => {
    setDisplayValue("0");
    setFirstOperand(null);
    setWaitingForSecondOperand(false);
    setOperator(null);
  };

  return (
    <div className="calculator">
      <Screen displayValue={displayValue} />
      <div className="calculator-keys">
        {["+", "-", "*", "/"].map((op) => (
          <Key
            key={op}
            button={{
              class: "operator",
              value: op,
              type: "operator",
              label: op === "*" ? "×" : op === "/" ? "÷" : op,
            }}
            handleButtonClick={handleOperator}
          />
        ))}
        {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((num) => (
          <Key
            key={num}
            button={{
              class: "",
              value: num.toString(),
              type: "number",
              label: num.toString(),
            }}
            handleButtonClick={inputDigit}
          />
        ))}
        <Key
          button={{
            class: "operator equal-sign",
            value: "=",
            type: "operator",
            label: "=",
          }}
          handleButtonClick={handleOperator}
        />
        <Key
          button={{
            class: "",
            value: ".",
            type: "decimal",
            label: ".",
          }}
          handleButtonClick={inputDecimal}
        />
        <Key
          button={{
            class: "all-clear",
            value: "all-clear",
            type: "clear",
            label: "AC",
          }}
          handleButtonClick={resetCalculator}
        />
      </div>
    </div>
  );
};

export default Calculator;
