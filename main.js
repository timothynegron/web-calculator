// ┌──────────────────────┐
// │   Global Variables   │	
// └──────────────────────┘
let firstNumber = "";
let secondNumber = "";
let operation = "";
let operationToggle = true;
const displayBottom = document.querySelector("#display-bottom");
const displayTop = document.querySelector("#display-top");

// ┌───────────────────────┐
// │   Set Functionality   │	
// └───────────────────────┘
setEventListeners();

// ┌─────────────────────┐
// │   Event Listeners   │	
// └─────────────────────┘
function setEventListeners(){
    // Set all Buttons except equals
    const allButtons = document.querySelectorAll(".calc-button");
    for(let i = 0; i < allButtons.length; i++){
        allButtons[i].addEventListener("click", buttonClicked)
    }
    document.querySelector("#button-equals").addEventListener("click", buttonClicked);
}

// ┌───────────────┐
// │   Functions   │	
// └───────────────┘

function buttonClicked(){
    const valueClicked = event.target.innerText;

    // If Operator Button Pressed
    if(valueClicked === document.querySelector("#button-plus").innerText
    || valueClicked === document.querySelector("#button-subtract").innerText
    || valueClicked === document.querySelector("#button-multiply").innerText
    || valueClicked === document.querySelector("#button-divide").innerText)
    {
        // If operation not pressed previously
        if(operationToggle){
            operation = valueClicked;
            displayBottom.innerText += valueClicked;
            operationToggle = !operationToggle;
        }

        // If operation was pressed previously
        else{
            displayTop.innerText = firstNumber + operation + secondNumber;
            firstNumber = calculate();
            if(calculate() === NaN){
                displayBottom.innerText = "ERR";
            }
            operation = valueClicked;
            displayBottom.innerText = firstNumber + operation;
        }
    }

    // If Equals Button Pressed
    else if(valueClicked === document.querySelector("#button-equals").innerText)
    {
        displayTop.innerText = firstNumber + operation + secondNumber;
        operationToggle = true;
        displayBottom.innerText = calculate(); 
        firstNumber = calculate();
        secondNumber = "";
        operation = "";
    }

    // If Clear Button Pressed
    else if(valueClicked === document.querySelector("#button-c").innerText)
    {
        operationToggle = true;
        clearDisplay();
    }

    // It's a Number
    else
    {
        if(operationToggle){
            firstNumber += valueClicked;
            displayBottom.innerText = firstNumber;
            if(firstNumber.length > 7){
                displayBottom.innerText = "ERR";
            }
        }
        else{
            secondNumber += valueClicked;
            displayBottom.innerText = firstNumber + operation + secondNumber;
            console.log((firstNumber + operation + secondNumber).length);
            if((firstNumber + operation + secondNumber).length > 7){
                displayBottom.innerText = "ERR";
            }
        }
    }
}

function calculate(){

    if(operation === document.querySelector("#button-plus").innerText){
        return Number(firstNumber) + Number(secondNumber);
    }

    if(operation === document.querySelector("#button-subtract").innerText){
        return Number(firstNumber) - Number(secondNumber);
    }

    if(operation === document.querySelector("#button-multiply").innerText){
        return Number(firstNumber) * Number(secondNumber);
    }

    if(operation === document.querySelector("#button-divide").innerText){
        return Number(firstNumber) / Number(secondNumber);
    }
}

function clearDisplay() {
    displayBottom.innerHTML = "";
    displayTop.innerHTML = "";
    firstNumber = "";
    secondNumber = "";
    operation = "";
}

// ┌──────────┐
// │   Bugs   │	
// └──────────┘
// (1) NaN23409+23094
// (2) Err ... undefined
// (3) Err * Number = Result
// (4) Two operators back to back