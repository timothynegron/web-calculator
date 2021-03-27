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

let displayBottom = document.querySelector("#display-bottom");
const displayTop = document.querySelector("#display-top");

const buttonPlusMinus = "±";
const buttonSquareRoot = "√"
const buttonSquared = "x²"
const buttonPercent = "%";
const buttonPoint = ".";
const buttonEquals = "=";
const buttonAllClear = "AC";
const buttonPlus = "+";
const buttonSubtract = "-";
const buttonMultiply = "×";
const buttonDivide = "÷";


// ┌─────────────────────────┐
// │   Set Event Listeners   │	
// └─────────────────────────┘
setEventListeners();

// ┌─────────────────────────────┐
// │   Event Listener Function   │	
// └─────────────────────────────┘
function setEventListeners(){

    // Get all Buttons
    const allButtons = document.querySelectorAll(".calc-button");

    // Set all Buttons
    for(let i = 0; i < allButtons.length; i++){
        allButtons[i].addEventListener("click", buttonClickedReadValue);
    }
}

// ┌───────────────────────────────────────────────┐
// │   Read The Button That Was Clicked Function   │	
// └───────────────────────────────────────────────┘
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

        case buttonAllClear:
            allClearClicked();
            break;

        case buttonSquareRoot:
            squareRootClicked();
            break;

        case buttonSquared:
            squaredClicked();
            break;

        case buttonPercent:
            percentClicked();
            break;

        case buttonPlusMinus:
            plusMinusClicked();
            break;

        case buttonPoint:
            pointClicked();
            break;

        default:
            numberClicked();
            break;
    }
}

// ┌──────────────────────────────┐
// │   Button Clicked Functions   │	
// └──────────────────────────────┘

function operatorClicked(){

    // Check if equals button was Clicked
    if(buttonClickedValue === buttonEquals){
        operatorEqualsClicked();
    }

    // If equals button not clicked, do something only if there is NOT a first number
    else if(firstNumber !== ""){
        operatorEqualsNotClicked();
    }
}

function operatorEqualsClicked(){

    // Only calculate only if there is an existing value for each variable
    if(firstNumber !== "" && operator !== "" && secondNumber !== ""){
        if(isValidResult()){
            updateBottomDisplayWithResult();
            resetVariablesEqualsClicked();
        }
    }
}

function operatorEqualsNotClicked(){

    // If operators [ + || - || * || / ] was NOT Clicked previously
    if(operatorNotClickedPreviously){
        operatorEqualsNotClickedSetOperator();
    }

    // Operators [ + || - || * || / ] was Clicked previously
    else{
        operatorEqualsNotClickedAgain();
    }
}

function operatorEqualsNotClickedSetOperator(){

    operatorNotClickedPreviously = false;

    buildStringOperator();
    updateBottomDisplayWithCurrentExpression();
    resetPointNotClicked();
}

function operatorEqualsNotClickedAgain(){

    // If there is not a second number update the operator
    if(secondNumber === ""){
        buildStringOperator();
        updateBottomDisplayWithCurrentExpression();
    }

    // If there is a second number and valid result
    if(secondNumber !== "" && isValidResult()){
        setFirstNumberWithResult();
        buildStringOperator();
        resetSecondNumber();
        resetPointNotClicked();
        updateBottomDisplayWithCurrentExpression();
    }
}

function pointClicked(){

    // If point was NOT Clicked previously AND operator was not
    if(pointNotClicked && operatorNotClickedPreviously === true){

        pointNotClicked = false;

        // Add the point to First Number
        buildStringFirstNumber();
        updateBottomDisplayWithCurrentExpression();
    }

    // If point was NOT Clicked previously AND operator was
    if(pointNotClicked && operatorNotClickedPreviously === false){

        pointNotClicked = false;

        // Add the point to Second Number
        buildStringSecondNumber();
        updateBottomDisplayWithCurrentExpression();
    }
}

// TODO: Refactor, (Parenthesis features)
function plusMinusClicked(){

    if(operatorNotClickedPreviously){
        firstNumber *= -1;
        updateBottomDisplayWithCurrentExpression();
    }

    else{
        secondNumber *= -1;
        updateBottomDisplayWithCurrentExpression();
    }
}

// TODO: Refactor
function percentClicked(){

    if(operatorNotClickedPreviously){
        firstNumber *= 0.01;
        pointNotClicked = false;
        updateBottomDisplayWithCurrentExpression();
        
        if(Number.isInteger(firstNumber)){
            resetPointNotClicked();
        }
    }
    
    else{
        if(secondNumber !== ""){
            secondNumber *= 0.01;
            pointNotClicked = false;
            updateBottomDisplayWithCurrentExpression();
        }

        if(Number.isInteger(secondNumber)){
            resetPointNotClicked();
        }
    }
}

// TODO: Refactor
function squaredClicked(){

    if(operatorNotClickedPreviously){
        firstNumber *= firstNumber
        updateBottomDisplayWithCurrentExpression();
    }

    else{
        if(secondNumber !== ""){
            secondNumber *= secondNumber;
            updateBottomDisplayWithCurrentExpression();
        }
    }
}

function allClearClicked(){

    updateTopAndBottomDisplayAllClear();
    resetVariablesAllClearClicked();
}

// TODO: Refactor
function squareRootClicked(){

    if(operatorNotClickedPreviously){
        firstNumber = Math.sqrt(firstNumber).toString();
        updateBottomDisplayWithCurrentExpression();
    }

    else{
        if(secondNumber !== ""){
            secondNumber = Math.sqrt(Number(secondNumber));
            updateBottomDisplayWithCurrentExpression();
            console.log(firstNumber + operator + secondNumber);
        }
    }
}

function numberClicked(){

    // If a operator was NOT Clicked previously
    if(operatorNotClickedPreviously){
        buildStringFirstNumber();
        updateBottomDisplayWithCurrentExpression();
    }

    // Operator Clicked previously AND a first number exist
    else{
        buildStringSecondNumber();
        updateBottomDisplayWithCurrentExpression();
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
        resetVariablesAllClearClicked();
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

    // If no result from a previous equation exist, build the first number
    if(resultDoesNotExist){
        firstNumber += buttonClickedValue;
    }

    // User wants to build a new number FirstNumber after a previous result
    else{
        resetFirstNumber();
        resetResultDoesNotExist();
        firstNumber += buttonClickedValue;
    }
}

function buildStringSecondNumber(){
    secondNumber += buttonClickedValue;
}

function buildStringOperator(){
    operator = buttonClickedValue;
}

function updateBottomDisplayWithCurrentExpression(){
    displayBottom.innerText = firstNumber + operator + secondNumber;
}

function updateBottomDisplayWithResult(){
    displayBottom.innerText = result; 
}

function updateBottomDisplayWithErrorMessage(){
    displayBottom.innerText = "Not a Number";
}

function updateTopDisplayWithPreviousExpression(){

    displayTop.innerText = firstNumber + operator + secondNumber;
}

function updateTopAndBottomDisplayAllClear() {
    displayBottom.innerHTML = "0";
    displayTop.innerHTML = "";
}

function resetVariablesAllClearClicked(){
    resetFirstNumber();
    resetSecondNumber();
    resetOperator();
    resetOperatorNotClickedPreviously();
    resetPointNotClicked();
    resetResultDoesNotExist();
}

function resetVariablesEqualsClicked(){
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

// Bugs
// NaN after percent 
// NaN after squared
// Nan after point and then modulus

// Add zero if not number exist and point clicked

// Display drops slightly