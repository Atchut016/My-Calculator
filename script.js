const display = document.getElementById("display");
const expression = document.getElementById("expression");

const buttonGrid = document.getElementsByClassName("button-grid")[0];
const buttons = buttonGrid.getElementsByTagName("button");

let currentInput = "";

function updateDisplay() {

    if (currentInput == "") {
        display.value = "0";
        expression.innerHTML = "";
    }
    else {
        display.value = currentInput;
        expression.innerHTML = currentInput;
    }

}

function appendValue(value) {
    let lastChar = currentInput.charAt(currentInput.length - 1);
    if (value == "+" || value == "-" || value == "*" || value == "/") {
        if (currentInput == "")
            return;

        if (lastChar == "+" || lastChar == "-" ||
            lastChar == "*" || lastChar == "/") {

            currentInput =
                currentInput.substring(0, currentInput.length - 1);

        }
        currentInput += value;
        updateDisplay();
        return;
    }

    if (value == ".") {
        let dotFound = false;
        for (let i = currentInput.length - 1; i >= 0; i--) {

            if (currentInput.charAt(i) == ".") {
                dotFound = true;
                break;
            }

            if (currentInput.charAt(i) == "+" ||
                currentInput.charAt(i) == "-" ||
                currentInput.charAt(i) == "*" ||
                currentInput.charAt(i) == "/") {

                break;
            }

        }
        if (dotFound)
            return;

    }
    currentInput += value;
    updateDisplay();

}

function clearDisplay() {
    currentInput = "";
    updateDisplay();

}

function deleteLast() {
    currentInput = currentInput.substring(0, currentInput.length - 1);
    updateDisplay();

}
function percentage() {
    if (currentInput == "")
        return;
    currentInput = String(Number(currentInput) / 100);
    updateDisplay();

}


function calculateResult() {
    if (currentInput == "")
        return;
    try {
        let answer = eval(currentInput);
        if (answer == Infinity || answer == -Infinity) {

            display.value = "Cannot Divide by 0";
            expression.innerHTML = "";
            currentInput = "";
            return;

        }
        currentInput = String(answer);
        updateDisplay();

    }

    catch {
        display.value = "Invalid";
        expression.innerHTML = "";
        currentInput = "";
    }

}

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {

        let value = buttons[i].getAttribute("data-value");

        switch (value) {

            case "clear":
                clearDisplay();
                break;

            case "backspace":
                deleteLast();
                break;

            case "percent":
                percentage();
                break;

            case "=":
                calculateResult();
                break;

            default:
                appendValue(value);

        }

    });

}

document.addEventListener("keydown", function (event) {

    let key = event.key;
    if ((key >= "0" && key <= "9") ||
        key == "+" ||
        key == "-" ||
        key == "*" ||
        key == "/" ||
        key == ".") {

        appendValue(key);

    }

    else if (key == "Enter") {
        calculateResult();
    }

    else if (key == "Backspace") {
        deleteLast();
    }

    else if (key == "Escape") {
        clearDisplay();
    }

});