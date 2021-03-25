// ┌──────────────────────┐
// │   Global Variables   │	
// └──────────────────────┘
let firstNumber = "";
let secondNumber = "";
let operation = "";
let operationNotPressed = true;
let valueClicked = "";
let dotNotPressed = true;
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
        if(firstNumber !== "" && operation !== "" && secondNumber !== ""){
            equalsPressed();
        }
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
    operationNotPressed = true;
    dotNotPressed = true;
}

function equalsPressed(){
    displayTop.innerText = firstNumber + operation + secondNumber;
    displayBottom.innerText = calculate(); 
    firstNumber = calculate();
    secondNumber = "";
    operation = "";
    operationNotPressed = true;
    dotNotPressed = false;
}

function numberPressed(){

    if(operationNotPressed){
        if(dotNotPressed){
            firstNumber += valueClicked;
            displayBottom.innerText = firstNumber;
        }

        else if(valueClicked !== document.querySelector("#button-dot").innerText){
            firstNumber += valueClicked;
            displayBottom.innerText = firstNumber;
        }
    }
    else{
        if(dotNotPressed){
            secondNumber += valueClicked;
            displayBottom.innerText = firstNumber + operation + secondNumber;
        }

        else if(valueClicked !== document.querySelector("#button-dot").innerText){
            secondNumber += valueClicked;
            displayBottom.innerText = firstNumber + operation + secondNumber;
        }
    }

    if(valueClicked === document.querySelector("#button-dot").innerText){
        dotNotPressed = false;
    }
}

function operationPressed(){
    
    if(firstNumber !== ""){
        // If operation not pressed previously
        if(operationNotPressed){
            operation = valueClicked;
            displayBottom.innerText += valueClicked;
            operationNotPressed = !operationNotPressed;
            dotNotPressed = true;
        }
    
        // If operation was pressed previously
        else{
            if(secondNumber !== ""){
                displayTop.innerText = firstNumber + operation + secondNumber;
                firstNumber = calculate();
                operation = valueClicked;
                displayBottom.innerText = firstNumber + operation;
                secondNumber = "";
            }else{
                operation = valueClicked;
                displayBottom.innerText = firstNumber + operation;
            }
        }
    }
}

// ┌──────────┐
// │   Bugs   │	
// └──────────┘

// (1) NaN23409+23094
// (2) Could put operator first