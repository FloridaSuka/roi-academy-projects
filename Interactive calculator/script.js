const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

let currentInput = "0";

function updateDisplay() {
  display.textContent = currentInput;
}

updateDisplay();

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (button.id === "clearBtn") {
      currentInput = "0";
    } else if (button.id === "backspaceBtn") {
      currentInput = currentInput.slice(0, -1) || "0";
    } else if (button.id === "equalsBtn") {
      try {
        const expression = currentInput.replace(/÷/g, "/").replace(/×/g, "*");
        currentInput = eval(expression).toString();
      } catch {
        currentInput = "Error";
      }
    } else if (button.id === "additionBtn") {
      currentInput += "+";
    } else if (button.id === "subtractionBtn") {
      currentInput += "-";
    } else if (button.id === "multiplicationBtn") {
      currentInput += "×";
    } else if (button.id === "divisionBtn") {
      currentInput += "÷";
    } else if (button.id === "decimalBtn") {
      const parts = currentInput.split(/[\+\-\×\÷]/);
      const lastPart = parts[parts.length - 1];
      if (!lastPart.includes(".")) {
        currentInput += ".";
      }
    } else {
      if (currentInput === "0") {
        currentInput = value;
      } else {
        currentInput += value;
      }
    }

    updateDisplay();
  });
});
