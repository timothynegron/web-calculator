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
const buttonEquals = document.querySelector("#button-equals").innerText;
const buttonClear = document.querySelector("#button-c").innerText;
const buttonPoint = document.querySelector("#button-point").innerText;

// ┌─────────────────────────┐
// │   Set Event Listeners   │	
// └─────────────────────────┘
setEventListeners();

// ┌─────────────────────────────┐
// │   Event Listener Function   │	
// └─────────────────────────────┘
function setEventListeners(){

    // Get all Buttons except equals
    const allButtons = document.querySelectorAll(".calc-button");

    // Set all Buttons except equals
    for(let i = 0; i < allButtons.length; i++){
        allButtons[i].addEventListener("click", buttonClickedReadValue);
    }

    // Set equals
    document.querySelector("#button-equals").addEventListener("click", buttonClickedReadValue);
}

// ┌──────────────────────────────────┐
// │   Read Button Clicked Function   │	
// └──────────────────────────────────┘
function buttonClickedReadValue(){
    
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
            clearClicked();
            break;

        default:
            numberClicked();
            break;
    }
}

// ┌──────────────────────────────┐
// │   Button Clicked Functions   │	
// └──────────────────────────────┘

function clearClicked(){

    updateBottomAndTopDisplayClearAll();
    resetAllClearClicked();
}

function equalsClicked(){

    // Only calculate only if there is an existing value for each variable
    if(firstNumber !== "" && operator !== "" && secondNumber !== ""){
        if(isValidResult()){
            updateBottomDisplayWithResult();
            resetEqualsClicked();
        }
    }
}

function pointClicked(){

    // If operator and point was NOT previously Clicked
    if(operatorNotClickedPreviously && pointNotClicked){
        buildStringFirstNumber();
        pointNotClicked = false;
    }

    // If point was NOT Clicked
    else if(pointNotClicked){
        buildStringSecondNumber();
        pointNotClicked = false;
    }
}

function numberClicked(){

    // If a operator was NOT Clicked, do something
    if(operatorNotClickedPreviously){

        // If no result from a previous equation exist, build the first number
        if(resultDoesNotExist){
            buildStringFirstNumber();
        }
    }

    // A operator was Clicked previously, build the second number
    else{
            buildStringSecondNumber();
    }
}

function operatorClicked(){

    // Check if equals button was Clicked
    if(buttonClickedValue === buttonEquals){
        equalsClicked();
    }

    // Do something only if there is NOT a first number
    else if(firstNumber !== ""){

        // If [ + || - || * || / ] was NOT Clicked previously
        if(operatorNotClickedPreviously){
            operatorClickedNewFirstNumber();
        }
    
        // [ + || - || * || / ] was Clicked previously
        else{

            // If there is a second number calculate and set the new operator
            if(secondNumber !== ""){
                operatorClickedAgain();
            }

            // If there is not a second number update the operator
            if(secondNumber === ""){
                buildStringOperator();
            }
        }
    }
}

function operatorClickedNewFirstNumber(){

    operatorNotClickedPreviously = false;

    buildStringOperator();
    resetPointNotClicked();
}

function operatorClickedAgain(){

    if(isValidResult()){
        setFirstNumberWithResult();
        resetSecondNumber();
        buildOperator();
    }
}

// ┌────────────────────┐
// │   Math Functions   │	
// └────────────────────┘

function isValidResult(){

    result = calculate();

    updateTopDisplayWithPreviousExpression();
    
    if(isNaN(result)){
        updateBottomDisplayWithErrorMessage();
        resetAllClearClicked();
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

function buildStringFirstNumber(){
    firstNumber += buttonClickedValue;
    updateBottomDisplayWithCurrentExpression();
}

function buildStringSecondNumber(){
    secondNumber += buttonClickedValue;
    updateBottomDisplayWithCurrentExpression();
}

function buildStringOperator(){
    operator = buttonClickedValue;
    updateBottomDisplayWithCurrentExpression();
}

function updateBottomDisplayWithCurrentExpression(){
    displayBottom.innerText = firstNumber + operator + secondNumber;
}

function updateBottomDisplayWithResult(){
    displayBottom.innerText = result; 
}

function updateTopDisplayWithPreviousExpression(){
    displayTop.innerText = firstNumber + operator + secondNumber;
}

function updateBottomDisplayWithErrorMessage(){
    displayBottom.innerText = "Not a Number";
}

function updateBottomAndTopDisplayClearAll() {
    displayBottom.innerHTML = "";
    displayTop.innerHTML = "";
}

function resetAllClearClicked(){
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

function setFirstNumberWithResult(){
    firstNumber = result;
}
