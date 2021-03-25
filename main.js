// ┌──────────────────────┐
// │   Global Variables   │	
// └──────────────────────┘
let firstNumber = "";
let secondNumber = "";
let operator = "";
let buttonPressedValue = "";
let dotNotPressed = true;
let resultDoesNotExist = true;
let operatorNotPressed = true;
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

// ┌──────────────────────┐
// │   Button Functions   │	
// └──────────────────────┘
function buttonClicked(){
    
    buttonPressedValue = event.target.innerText;

    // If Operator Button Pressed
    if(buttonPressedValue === document.querySelector("#button-plus").innerText
    || buttonPressedValue === document.querySelector("#button-subtract").innerText
    || buttonPressedValue === document.querySelector("#button-multiply").innerText
    || buttonPressedValue === document.querySelector("#button-divide").innerText)
    {
        operatorPressed();
    }
    // If Equals Button Pressed
    else if(buttonPressedValue === document.querySelector("#button-equals").innerText){
        if(firstNumber !== "" && operator !== "" && secondNumber !== ""){
            equalsPressed();
        }
    }
    // If Clear Button Pressed
    else if(buttonPressedValue === document.querySelector("#button-c").innerText){
        clearDisplay();
    }
    // If all cases false then it's a Number
    else{
        numberPressed();
    }
}

function equalsPressed(){

    displayTop.innerText = firstNumber + operator + secondNumber;

    if(isNaN(calculate())){
       errorMessage();
    }

    else{
        displayBottom.innerText = calculate(); 
        firstNumber = calculate();
        secondNumber = "";
        operator = "";
        operatorNotPressed = true;
        dotNotPressed = false;
        resultDoesNotExist = false;
    }
}

function numberPressed(){

    if(operatorNotPressed){

        if(resultDoesNotExist){

            if(dotNotPressed){
                firstNumber += buttonPressedValue;
                displayBottom.innerText = firstNumber;
            }

            else if(buttonPressedValue !== document.querySelector("#button-dot").innerText){
                firstNumber += buttonPressedValue;
                displayBottom.innerText = firstNumber;
            }
        }
    }

    else{

        if(dotNotPressed){
            secondNumber += buttonPressedValue;
            displayBottom.innerText = firstNumber + operator + secondNumber;
        }

        else if(buttonPressedValue !== document.querySelector("#button-dot").innerText){
            secondNumber += buttonPressedValue;
            displayBottom.innerText = firstNumber + operator + secondNumber;
        }
    }

    if(buttonPressedValue === document.querySelector("#button-dot").innerText){
        dotNotPressed = false;
    }
}

function operatorPressed(){

    if(firstNumber !== ""){
        // If operator not pressed previously
        if(operatorNotPressed){
            operator = buttonPressedValue;
            displayBottom.innerText += buttonPressedValue;
            operatorNotPressed = !operatorNotPressed;
            dotNotPressed = true;
        }
    
        // If operator was pressed previously
        else{
            if(secondNumber !== ""){
                displayTop.innerText = firstNumber + operator + secondNumber;
                firstNumber = calculate();
                operator = buttonPressedValue;
                displayBottom.innerText = firstNumber + operator;
                secondNumber = "";
            }else{
                operator = buttonPressedValue;
                displayBottom.innerText = firstNumber + operator;
            }
        }
    }
}

// ┌──────────────────────┐
// │   Helper Functions   │	
// └──────────────────────┘

function clearDisplay() {
    displayBottom.innerHTML = "";
    displayTop.innerHTML = "";
    firstNumber = "";
    secondNumber = "";
    operator = "";
    operatorNotPressed = true;
    dotNotPressed = true;
    resultDoesNotExist = true;
}

function errorMessage() {
    displayBottom.innerText = "Error";
    firstNumber = "";
    secondNumber = "";
    operator = "";
    operatorNotPressed = true;
    dotNotPressed = true;
    resultDoesNotExist = true;
}

function calculate(){

    if(operator === document.querySelector("#button-plus").innerText){
        return Number(firstNumber) + Number(secondNumber);
    }

    if(operator === document.querySelector("#button-subtract").innerText){
        return Number(firstNumber) - Number(secondNumber);
    }

    if(operator === document.querySelector("#button-multiply").innerText){
        return Number(firstNumber) * Number(secondNumber);
    }

    if(operator === document.querySelector("#button-divide").innerText){
        return Number(firstNumber) / Number(secondNumber);
    }
}
