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
let basicOperatorNotClickedPreviously = true;

const displayBottom = document.querySelector("#display-bottom");
const displayTop = document.querySelector("#display-top");

const symbolPlusMinus = "±";
const symbolSquareRoot = "√"
const symbolSquared_1 = "x²"
const symbolSquared_2 = "²"
const symbolPercent = "%";
const symbolPoint = ".";
const symbolEquals = "=";
const symbolAllClear = "AC";
const symbolPlus = "+";
const symbolSubtract = "-";
const symbolMultiply = "×";
const symbolDivide = "÷";

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

        case symbolPlus:
        case symbolSubtract:
        case symbolMultiply:
        case symbolDivide:
            basicOperatorClicked();
            break;

        case symbolEquals:
            equalsClicked();
            break;

        case symbolAllClear:
            allClearClicked();
            break;

        case symbolSquareRoot:
            squareRootClicked();
            break;

        case symbolSquared_1:
            squaredClicked();
            break;

        case symbolPercent:
            percentClicked();
            break;

        case symbolPlusMinus:
            plusMinusClicked();
            break;

        case symbolPoint:
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

function basicOperatorClicked(){

    // If operators [ + || - || * || / ] was NOT Clicked previously
    if(basicOperatorNotClickedPreviously){
        basicOperatorClickedSetOperator();
    }

    // Operators [ + || - || * || / ] was Clicked previously
    else{
        basicOperatorClickedAgain();
    }
}

function basicOperatorClickedSetOperator(){

    basicOperatorNotClickedPreviously = false;

    setOperator();
    updateBottomDisplayWithCurrentExpression();
    resetPointNotClicked();
}

function basicOperatorClickedAgain(){

    // If there is not a second number update the operator
    if(secondNumber === ""){
        setOperator();
        updateBottomDisplayWithCurrentExpression();
    }

    // If there is a second number and valid result, display the result and operator
    if(secondNumber !== "" && isValidResult()){

        resetPointNotClicked();
        resetSecondNumber();

        setFirstNumberWithResult();
        setOperator();
        updateBottomDisplayWithCurrentExpression();
    }
}

function equalsClicked(){

    //Only calculate only if there is an existing value for each variable
    if(firstNumber !== "" && operator !== "" && secondNumber !== ""){
        if(isValidResult()){
            updateBottomDisplayWithResult();
            resetVariablesEqualsClicked();
        }
    }
}

function allClearClicked(){

    updateTopAndBottomDisplayAllClear();
    resetVariablesAllClearClicked();
}

// TODO: Refactor
function squareRootClicked(){

    if(basicOperatorNotClickedPreviously){
        displayTop.innerText = symbolSquareRoot + " " + firstNumber;
        if(isValidSquareRoot(firstNumber)){
            setFirstNumberWithResult();
            updateBottomDisplayWithCurrentExpression();
        }
    }

    else{
        if(secondNumber !== ""){
            displayTop.innerText = firstNumber + " " + operator + " " + symbolSquareRoot + " " + secondNumber;
            if(isValidSquareRoot(secondNumber)){
                secondNumber = result;
                result = calculateExpression();
                updateBottomDisplayWithCurrentExpression();
                setFirstNumberWithResult();
                resetOperator();
                resetSecondNumber();
                updateBottomDisplayWithCurrentExpression();
            }
        }
    }
}

function squaredClicked(){

    if(basicOperatorNotClickedPreviously){
        if(isValidSquare(firstNumber)){
            setFirstNumberWithResult();
            updateBottomDisplayWithCurrentExpression();
        }
    }

    else{
        if(secondNumber !== ""){
            if(isValidSquare(secondNumber)){
                secondNumber = result;
                result = calculateExpression();
                setFirstNumberWithResult();
                resetOperator();
                resetSecondNumber();
                updateBottomDisplayWithCurrentExpression();
            }
        }
    }
}

function percentClicked(){

    if(basicOperatorNotClickedPreviously){
        if(isValidPercent(firstNumber)){
            setFirstNumberWithResult();
            updateBottomDisplayWithCurrentExpression();
        }
    }
    
    else{
        if(isValidPercent(secondNumber)){
            secondNumber = result;
            result = calculateExpression();
            setFirstNumberWithResult();
            resetOperator();
            resetSecondNumber();
            updateBottomDisplayWithCurrentExpression();
        }
    }
}

// TODO: Refactor, (Parenthesis features)
function plusMinusClicked(){

    if(basicOperatorNotClickedPreviously){
        firstNumber *= -1;
        updateBottomDisplayWithCurrentExpression();
    }

    else{
        secondNumber *= -1;
        updateBottomDisplayWithCurrentExpression();
    }
}

function pointClicked(){

    // If point was NOT Clicked previously AND operator was not
    if(pointNotClicked && basicOperatorNotClickedPreviously === true){

        pointNotClicked = false;

        // Add the point to First Number
        buildStringFirstNumber();
        updateBottomDisplayWithCurrentExpression();
    }

    // If point was NOT Clicked previously AND operator was clicked
    if(pointNotClicked && basicOperatorNotClickedPreviously === false){

        pointNotClicked = false;

        // Add the point to Second Number
        buildStringSecondNumber();
        updateBottomDisplayWithCurrentExpression();
    }
}

function numberClicked(){

    // If a operator was NOT Clicked previously
    if(basicOperatorNotClickedPreviously){
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

function calculateExpression(){

    if(operator === symbolPlus){
        return Number(firstNumber) + Number(secondNumber);
    }

    if(operator === symbolSubtract){
        return Number(firstNumber) - Number(secondNumber);
    }

    if(operator === symbolMultiply){
        return Number(firstNumber) * Number(secondNumber);
    }

    if(operator === symbolDivide){
        return Number(firstNumber) / Number(secondNumber);
    }
}

function isValidResult(){

    result = calculateExpression();

    updateTopDisplayWithPreviousExpression();
    
    if(isNaN(result)){
        updateBottomDisplayWithErrorMessage();
        resetVariablesAllClearClicked();
        return false;
    }

    return true;
}

function isValidSquare(number){

    result = Number(number * number);

    updateTopDisplayWithPreviousExpression();
    displayTop.innerText += symbolSquared_2;

    if(isNaN(result)){
        updateBottomDisplayWithErrorMessage();
        resetVariablesAllClearClicked();
        return false;
    }

    return true;
}

function isValidPercent(number){
    
    result = number *= 0.01;
    pointNotClicked = false;

    updateTopDisplayWithPreviousExpression();
    displayTop.innerText += symbolPercent;
    
    if(Number.isInteger(result)){
        resetPointNotClicked();
    }

    if(isNaN(result)){
        updateBottomDisplayWithErrorMessage();
        resetVariablesAllClearClicked();
        return false;
    }

    return true;
}

function isValidSquareRoot(number){

    result = Math.sqrt(Number(number));

    if(isNaN(result)){
        updateBottomDisplayWithErrorMessage();
        resetVariablesAllClearClicked();
        return false;
    }
    
    return true;
}

// ┌──────────────────────┐
// │   Helper Functions   │	
// └──────────────────────┘

function buildStringFirstNumber(){

    // If no result from a previous equation exist, build the first number
    if(resultDoesNotExist){
        firstNumber += buttonClickedValue;

        // TODO: Engineering Notation
        // if(firstNumber.length > 12){
        //     firstNumber = Number(firstNumber).toPrecision(3);
        // }
    }

    // User wants to build a new FirstNumber after a previous result
    else{
        resetFirstNumber();
        resetPointNotClicked();
        resetResultDoesNotExist();
        firstNumber += buttonClickedValue;
    }
}

function buildStringSecondNumber(){
    secondNumber += buttonClickedValue;

    // TODO: Engineering Notation
    //if((firstNumber + operator + secondNumber).length > 12){
    //    secondNumber = Number(secondNumber).toPrecision(3);
    //}
}

function setOperator(){
    operator = buttonClickedValue;
}

function setFirstNumberWithResult(){
    firstNumber = result;
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

    displayTop.innerText = firstNumber + " " + operator + " " + secondNumber;
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
    basicOperatorNotClickedPreviously = true;
}

function resetPointNotClicked(){
    pointNotClicked = true;
}

function resetResultDoesNotExist(){
    resultDoesNotExist = true;
}

// ---------------------------------------------
//                     BUGS
// ---------------------------------------------
//
// ----> NaN: Period than squared
// ----> NaN: Period than modulus
//
// ----> Could add numbers after percent entered.
//
// ---------------------------------------------
// ---------------------------------------------

// Feature ---> Equals clicked AGAIN with only one operator
// Feature ---> Parenthesis around negative number for second number (build parenthesis)
// Feature ---> Engineering Notation
// Feature ---> square, percent, square root on top display