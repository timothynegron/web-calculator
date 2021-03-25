// ┌──────────────────────┐
// │   Global Variables   │	
// └──────────────────────┘
let firstNumber = "";
let secondNumber = "";
let operation = "";
let operationWasJustPressed = false;
let operationToggle = true;
let valueClicked = "";
const displayBottom = document.querySelector("#display-bottom");
const displayTop = document.querySelector("#display-top");

// ┌───────────────────────────┐
// │   Set App Functionality   │	
// └───────────────────────────┘
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
    // Set equals
    document.querySelector("#button-equals").addEventListener("click", buttonClicked);
}

// ┌───────────────┐
// │   Functions   │	
// └───────────────┘

function buttonClicked(){
    
    valueClicked = event.target.innerText;

    // If Operator Button Pressed
    if(valueClicked === document.querySelector("#button-plus").innerText
    || valueClicked === document.querySelector("#button-subtract").innerText
    || valueClicked === document.querySelector("#button-multiply").innerText
    || valueClicked === document.querySelector("#button-divide").innerText)
    {
        operationPressed();
    }
    // If Equals Button Pressed
    else if(valueClicked === document.querySelector("#button-equals").innerText)
    {
        equalsPressed();
    }
    // If Clear Button Pressed
    else if(valueClicked === document.querySelector("#button-c").innerText)
    {
        clearDisplay();
    }
    // If all cases false then it's a Number
    else
    {
        numberPressed();
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
    operationToggle = true;
}

function equalsPressed(){
    displayTop.innerText = firstNumber + operation + secondNumber;
    operationToggle = true;
    displayBottom.innerText = calculate(); 
    firstNumber = calculate();
    secondNumber = "";
    operation = "";
}

function numberPressed(){
    if(operationToggle){
        firstNumber += valueClicked;
        displayBottom.innerText = firstNumber;
    }
    else{
        secondNumber += valueClicked;
        displayBottom.innerText = firstNumber + operation + secondNumber;
        console.log((firstNumber + operation + secondNumber).length);
    }
}

function operationPressed(){
    // If operation not pressed previously
    if(operationToggle){
        operation = valueClicked;
        displayBottom.innerText += valueClicked;
        operationToggle = !operationToggle;
        operationWasJustPressed = true;
    }

    // If operation was pressed previously
    else{
        displayTop.innerText = firstNumber + operation + secondNumber;
        firstNumber = calculate();
        operation = valueClicked;
        displayBottom.innerText = firstNumber + operation;
    }
}

// ┌──────────┐
// │   Bugs   │	
// └──────────┘

// (1) NaN23409+23094
// (4) Two operators back to back
// (6) 50 + 50 + 50 + 50
// If operator already exist then swap with new one being requested