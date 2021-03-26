// ┌─────────────────────────────────┐
// │   Initialize Global Variables   │	
// └─────────────────────────────────┘
let firstNumber = "";
let secondNumber = "";
let operator = "";
let buttonClickedValue = "";
let result = "";
let pointNotClicked = true;
let resultDoesNotExist = true;
let operatorNotClickedPreviously = true;
const displayBottom = document.querySelector("#display-bottom");
const displayTop = document.querySelector("#display-top");
const buttonPlus = document.querySelector("#button-plus").innerText;
const buttonSubtract = document.querySelector("#button-subtract").innerText;
const buttonMultiply = document.querySelector("#button-multiply").innerText;
const buttonDivide = document.querySelector("#button-divide").innerText;
const buttonEquals = document.querySelector("#button-equals").innerText
const buttonClear = document.querySelector("#button-c").innerText;
const buttonPoint = document.querySelector("#button-point").innerText;

// ┌─────────────────────────┐
// │   Set Event Listeners   │	
// └─────────────────────────┘
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
        allButtons[i].addEventListener("click", readButtonClicked)
    }

    // Set equals
    document.querySelector("#button-equals").addEventListener("click", readButtonClicked);
}

// ┌──────────────────────┐
// │   Button Functions   │	
// └──────────────────────┘
function readButtonClicked(){
    
    buttonClickedValue = event.target.innerText;

    switch(buttonClickedValue){

        case buttonPlus:
        case buttonSubtract:
        case buttonMultiply:
        case buttonDivide:
        case buttonEquals:
            operatorClicked();
            break;

        case buttonPoint:
            pointClicked();
            break;

        case buttonClear:
            updateDisplayClearAll();
            break;

        default:
            numberClicked();
            break;
    }
}

function equalsClicked(){

    // Only calculate only if there is an existing value for each variable
    if(firstNumber !== "" && operator !== "" && secondNumber !== ""){
        if(isValidResult()){
            updateDisplayWithResult();
        }
    }
}

function pointClicked(){

    // If operator and point not previously Clicked
    if(operatorNotClickedPreviously && pointNotClicked){
        buildFirstNumber();
        pointNotClicked = false;
    }

    // If point was not Clicked
    else if(pointNotClicked){
        buildSecondNumber();
        pointNotClicked = false;
    }
}

function numberClicked(){

    // If a operator was not Clicked, do something
    if(operatorNotClickedPreviously){

        // If a result from a previous equation is not on the display, build the first number
        if(resultDoesNotExist){
            buildFirstNumber();
        }
    }

    // A operator was Clicked previously, build the second number
    else{
            buildSecondNumber();
    }
}

function operatorClicked(){

    // Check if equals button was Clicked
    if(buttonClickedValue === buttonEquals){
        equalsClicked();
    }

    // Do something only if there is not a first number
    else if(firstNumber !== ""){

        // If + - * / was not Clicked previously
        if(operatorNotClickedPreviously){
            operatorClickedNewFirstNumber();
        }
    
        // + - * / was Clicked previously
        else{

            // If there is a second number calculate and add the new operator
            if(secondNumber !== ""){
                operatorClickedAgain();
            }

            // If there is not a second number update the operator
            if(secondNumber === ""){
                operatorClickedChangeOperator();
            }
        }
    }
}

function operatorClickedNewFirstNumber(){

    operatorNotClickedPreviously = false;

    setOperator();
    resetPointNotClicked();
    updateDisplayWithCurrentExpression();
}

function operatorClickedAgain(){

    if(isValidResult()){
        setFirstNumberWithResult();
        setOperator();
        resetSecondNumber();
        updateDisplayWithCurrentExpression();
    }
}

function operatorClickedChangeOperator(){

    setOperator();
    updateDisplayWithCurrentExpression();
}

// ┌────────────────────┐
// │   Math Functions   │	
// └────────────────────┘

function isValidResult(){

    updateTopDisplay();

    result = calculate();
    
    if(isNaN(result)){
        updateDisplayErrorMessage();
        return false;
    }

    return true;
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

// ┌──────────────────────┐
// │   Helper Functions   │	
// └──────────────────────┘

function buildFirstNumber(){
    firstNumber += buttonClickedValue;
    updateDisplayWithCurrentExpression();
}

function buildSecondNumber(){
    secondNumber += buttonClickedValue;
    updateDisplayWithCurrentExpression();
}

function setOperator(){
    operator = buttonClickedValue;
}

function updateDisplayWithCurrentExpression(){
    displayBottom.innerText = firstNumber + operator + secondNumber;
}

function updateDisplayWithResult(){
    displayBottom.innerText = result; 
    resetEqualsClicked();
}

function updateTopDisplay(){
    displayTop.innerText = firstNumber + operator + secondNumber;
}

function updateDisplayErrorMessage(){
    displayBottom.innerText = "Not a Number";
    resetClearClicked();
}

function updateDisplayClearAll() {
    displayBottom.innerHTML = "";
    displayTop.innerHTML = "";
    resetClearClicked();
}

function resetClearClicked(){
    resetFirstNumber();
    resetSecondNumber();
    resetOperator();
    resetOperatorNotClickedPreviously();
    resetPointNotClicked();
    resetResultDoesNotExist();
}

function resetEqualsClicked(){
    setFirstNumberWithResult();
    resetSecondNumber();
    resetOperator();
    resetOperatorNotClickedPreviously();
    pointNotClicked = false;
    resultDoesNotExist = false;
}

function setFirstNumberWithResult(){
    firstNumber = result;
}

function resetFirstNumber(){
    firstNumber = "";
}

function resetSecondNumber(){
    secondNumber = "";
}

function resetOperator(){
    operator = "";
}

function resetOperatorNotClickedPreviously(){
    operatorNotClickedPreviously = true;
}

function resetPointNotClicked(){
    pointNotClicked = true;
}

function resetResultDoesNotExist(){
    resultDoesNotExist = true;
}
