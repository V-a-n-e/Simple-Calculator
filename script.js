// Vanessa Rodriguez
// November 24, 2024

// JavaScript will manage the calculator's logic 
// and handle user input to perform calculations.

let display = document.getElementById('display'); // Calculator display element
let currentInput = ''; // Current input value
let storedValue = ''; // Stored value for operations
let operator = null; // Operator for calculations
let resetDisplay = false; // Flag to clear display for next input

// Append numbers and operators to the display
function appendValue(value) {
    if (resetDisplay) {
        display.value = ''; // Clear display if reset flag is active
        resetDisplay = false;
    }
    display.value += value; // Add input to display
}

// Perform operations (+, -, *, /)
function performOperation(op) {
    // If display is empty and user presses '-', treat it as starting a negative number
    if (op === '-' && (display.value === '' || resetDisplay)) {
        appendValue('-');
        resetDisplay = false;
        return; // Return early as we don't need to do anything else
    }

    // Only proceed if there's a valid input in the display
    if (display.value !== '') {
        // If an operator already exists and a stored value exists, calculate the result
        if (operator && storedValue !== '') {
            calculate(); // Calculate if an operator exists
        }
        storedValue = display.value; // Store the current value for the operation
        operator = op; // Set the current operator
        resetDisplay = true; // Prepare for the next input
    }
}

// Calculate the result
function calculate() {
    if (storedValue && operator && display.value) {
        let result;
        const currentValue = parseFloat(display.value); // Current display value
        const previousValue = parseFloat(storedValue); // Stored value

        // Perform operation based on the operator
        switch (operator) {
            // Addition
            case '+':
                result = previousValue + currentValue;
                break;
            // Subtraction
            case '-':
                result = previousValue - currentValue;
                break;
            // Multiplication
            case '*':
                result = previousValue * currentValue;
                break;
            // Division
            case '/':
                // Handle division by zero, display Error message
                if (currentValue === 0) {
                    display.value = "Error";
                    return;
                }
                result = previousValue / currentValue;
                break;
            // Calculate x^y
            case '^':
                result = Math.pow(previousValue, currentValue);
                break;

            default:
                return;
        }

        // Check if the result is a decimal number
        if (result !== Math.floor(result) && result !== 0) {
            // Round the decimal number to 8 decimal places
            result = parseFloat(result.toFixed(8));
        } else if (result > 1e8 || result < -1e8 || (result !== 0 && Math.abs(result) < 1e-8)) {
            result = result.toExponential(8);  // Use scientific notation for extreme values
        }

        display.value = result; // Update display with result
        resetDisplay = true; // Rest display for next calculation
        operator = null; // Clear operator
        storedValue = ''; // Clear stored value
    }
}

// Clear all inputs and reset calculator (AC button)
function clearAll() {
    display.value = '';
    currentInput = '';
    storedValue = '';
    operator = null;
}

// Handle decimal point input (. button)
function addDecimal() {
    if (!display.value.includes('.')) {
        display.value += '.'; // Add decimal point if not already present
    }
}

// Calculate sine of current display value and round to 8 decimal places
// (sin button)
function calculateSin() {
    display.value = parseFloat(Math.sin(parseFloat(display.value)).toFixed(8));
    resetDisplay = true; // Reset display after calculation
}

// Calculate cosine of current display value and round to 8 decimal places
// (cos button)
function calculateCos() {
    display.value = parseFloat(Math.cos(parseFloat(display.value)).toFixed(8));
    resetDisplay = true; // Reset display after calculation
}

// Calculate tangent of current display value and round to 8 decimal places
// (tan button)
function calculateTan() {
    display.value = parseFloat(Math.tan(parseFloat(display.value)).toFixed(8));
    resetDisplay = true; // Reset display after calculation
}

// Calculate square root of current display value
// (√ button)
function calculateSqrt() {
    const currentValue = parseFloat(display.value);
    if (currentValue >= 0) {
        // Round to 8 decimal places
        display.value = parseFloat(Math.sqrt(currentValue).toFixed(8)); // Round to 8 decimal places
        resetDisplay = true; // Reset display after calculation
    } else {
        display.value = "Error"; // Handle square root of negative numbers
    }
}

// Calculate logarithm (base 10) of current display value
function calculateLog() {
    const currentValue = parseFloat(display.value);
    if (currentValue <= 0) {
        display.value = "Error"; // Handle logarithm of zero or negative number
        return;
    } else {
        // Round to 8 decimal places
        display.value = parseFloat(Math.log10(parseFloat(display.value)).toFixed(8));
        resetDisplay = true; // Reset display after calculation
    }
}

// Calculate natural logarithm (ln) of current display value
function calculateLn() {
    const currentValue = parseFloat(display.value);
    if (currentValue <= 0) {
        display.value = "Error"; // Handle logarithm of zero or negative number
        return;
    } else {
        // Round to 8 decimal places
        display.value = parseFloat(Math.log(parseFloat(display.value)).toFixed(8));
        resetDisplay = true; // Reset display after calculation
    }
}

// Insert pi value into display
// (π button) 
function insertPi() {
    // Round pi to 8 decimal places
    display.value = parseFloat(Math.PI.toFixed(8)); 
}

// Toggle dark mode for the calculator
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode'); // Switch between light and dark modes
}