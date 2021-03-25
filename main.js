// ┌──────────────────────┐
// │   Global Variables   │	
// └──────────────────────┘
let firstNumber = "";
let secondNumber = "";
let operator = "";
let buttonPressedValue = "";
let pointNotPressed = true;
let resultDoesNotExist = true;
let operatorNotPressed = true;
const displayBottom = document.querySelector("#display-bottom");
const displayTop = document.querySelector("#display-top");
const buttonPlus = document.querySelector("#button-plus").innerText;
const buttonSubtract = document.querySelector("#button-subtract").innerText;
const buttonMultiply = document.querySelector("#button-multiply").innerText;
const buttonDivide = document.querySelector("#button-divide").innerText;
const buttonEquals = document.querySelector("#button-equals").innerText
const buttonClear = document.querySelector("#button-c").innerText;
const buttonPoint = document.querySelector("#button-point").innerText;

// ┌───────────────────────────┐
// │   Set App Functionality   │	
// └───────────────────────────┘
setEventListeners();

// ┌─────────────────────┐
// │   Event Listeners   │	
// └─────────────────────┘
function setEventListeners(){

    // Get all Buttons except equals
    const allButtons = document.querySelectorAll(".calc-button");

    // Set all Buttons except equals
    for(let i = 0; i < allButtons.length; i++)
    {
        allButtons[i].addEventListener("click", buttonClicked)
    }

    // Set equals
    document.querySelector("#button-equals").addEventListener("click", buttonClicked);
}

// ┌──────────────────────┐
// │   Button Functions   │	
// └──────────────────────┘
function buttonClicked(){
    
    buttonPressedValue = event.target.innerText;

    // If Operator Button Pressed
    if( buttonPressedValue === buttonPlus
        || buttonPressedValue === buttonSubtract
        || buttonPressedValue === buttonMultiply
        || buttonPressedValue === buttonDivide)
    {   
        operatorPressed();
    }

    // If Equals Button Pressed
    else if(buttonPressedValue === buttonEquals)
    {
        // If firstNumber, operator, and secondNumber have values
        if(firstNumber !== "" && operator !== "" && secondNumber !== "")
        {
            equalsPressed();
        }
    }

    // If Clear Button Pressed
    else if(buttonPressedValue === buttonClear)
    {
        clearDisplay();
    }

    // If all cases are false then the value is a number
    else
    {
        numberPressed();
    }
}

function numberPressed(){

    if(operatorNotPressed){

        if(resultDoesNotExist)
        {

            if(pointNotPressed)
            {
                firstNumber += buttonPressedValue;
                displayBottom.innerText = firstNumber;
            }

            else if(buttonPressedValue !== buttonPoint){
                firstNumber += buttonPressedValue;
                displayBottom.innerText = firstNumber;
            }
        }
    }

    else
    {

        if(pointNotPressed){
            secondNumber += buttonPressedValue;
            updateBottomDisplay();
            
        }

        else if(buttonPressedValue !== buttonPoint){
            secondNumber += buttonPressedValue;
            updateBottomDisplay();
        }
    }

    if(buttonPressedValue === buttonPoint){
        pointNotPressed = false;
    }
}

function operatorPressed(){

    // If there is not first number
    if(firstNumber !== "")
    {
        // If an operator not pressed previously
        if(operatorNotPressed)
        {
            operator = buttonPressedValue;
            displayBottom.innerText += buttonPressedValue;
            operatorNotPressed = !operatorNotPressed;
            pointNotPressed = true;
        }
    
        // If there was an operator pressed previously
        else
        {
            // If there is not a second number change the operator
            if(secondNumber === "")
            {
                operator = buttonPressedValue;
                updateBottomDisplayOperator();
            }

            // If there is a second number
            if(secondNumber !== "")
            {
                operatorPressedAgain();
                updateBottomDisplayOperator();
            }
        }
    }
}

function equalsPressed(){

    // Update the top display
    updateTopDisplay();

    // Calculate the expression
    const result = calculate();

    // If result the result is not a number
    if(isNaN(result))
    {
        errorMessage();
    }

    // If the result is a number
    else
    {
        displayBottom.innerText = result; 
        firstNumber = result;
        secondNumber = "";
        operator = "";
        operatorNotPressed = true;
        pointNotPressed = false;
        resultDoesNotExist = false;
    }
}

// ┌──────────────────────┐
// │   Helper Functions   │	
// └──────────────────────┘

function clearDisplay() {
    
    displayBottom.innerHTML = "";
    displayTop.innerHTML = "";
    resetAllVariables();
}

function errorMessage() {

    displayBottom.innerText = "Not a Number";
    resetAllVariables();
}

function resetAllVariables(){

    firstNumber = "";
    secondNumber = "";
    operator = "";
    operatorNotPressed = true;
    pointNotPressed = true;
    resultDoesNotExist = true;
}

function calculate(){

    if(operator === buttonPlus){
        return Number(firstNumber) + Number(secondNumber);
    }

    if(operator === buttonSubtract){
        return Number(firstNumber) - Number(secondNumber);
    }

    if(operator === buttonMultiply){
        return Number(firstNumber) * Number(secondNumber);
    }

    if(operator === buttonDivide){
        return Number(firstNumber) / Number(secondNumber);
    }
}

function updateTopDisplay(){
    displayTop.innerText = firstNumber + operator + secondNumber;
}

function updateBottomDisplay(){
    displayBottom.innerText = firstNumber + operator + secondNumber;
}

function updateBottomDisplayOperator(){
    displayBottom.innerText = firstNumber + operator;
}

function operatorPressedAgain(){
    updateTopDisplay();
    // not checking for NaN
    firstNumber = calculate();
    operator = buttonPressedValue;
    secondNumber = "";
}

// displayBottom.innerText = result; 
// firstNumber = result;
// secondNumber = "";
// operator = ""; <---
// operatorNotPressed = true; <---
// pointNotPressed = false; <---
// resultDoesNotExist = false; <---