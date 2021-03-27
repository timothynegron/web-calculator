// ┌─────────────────────────────────┐
// │   Initialize Global Variables   │	
// └─────────────────────────────────┘
let firstNumber = "";
let secondNumber = "";
let operator = "";
let buttonClickedValue = "";
let result = "";
let decimalNotClicked = true;
let resultDoesNotExist = true;
let basicOperatorNotClickedPreviously = true;

const displayBottom = document.querySelector("#display-bottom");
const displayTop = document.querySelector("#display-top");

const symbolPlusMinus = "±";
const symbolSquareRoot = "√"
const symbolSquared_1 = "x²"
const symbolSquared_2 = "²"
const symbolPercent = "%";
const symbolDecimal = ".";
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

        case symbolDecimal:
            decimalClicked();
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
    resetDecimalNotClicked();
}

function basicOperatorClickedAgain(){

    // If there is not a second number update the operator
    if(secondNumber === ""){
        setOperator();
        updateBottomDisplayWithCurrentExpression();
    }

    // If there is a second number and valid result, display the result and operator
    if(secondNumber !== "" && isValidResult()){

        resetDecimalNotClicked();
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
            resetVariablesAfterCalculation();
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
            resetVariablesAfterCalculation();
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
                resetVariablesAfterCalculation();
                updateBottomDisplayWithCurrentExpression();
            }
        }
    }
}

function squaredClicked(){

    if(basicOperatorNotClickedPreviously){
        if(isValidSquare(firstNumber)){
            setFirstNumberWithResult();
            resetVariablesAfterCalculation();
            updateBottomDisplayWithCurrentExpression();
        }
    }

    else{
        if(secondNumber !== ""){
            if(isValidSquare(secondNumber)){
                secondNumber = result;
                result = calculateExpression();
                resetVariablesAfterCalculation();
                updateBottomDisplayWithCurrentExpression();
            }
        }
    }
}

function percentClicked(){

    if(basicOperatorNotClickedPreviously){
        if(isValidPercent(firstNumber)){
            setFirstNumberWithResult();
            resetVariablesAfterCalculation();
            updateBottomDisplayWithCurrentExpression();
        }
    }
    
    else{
        if(isValidPercent(secondNumber)){
            secondNumber = result;
            result = calculateExpression();
            resetVariablesAfterCalculation();
            updateBottomDisplayWithCurrentExpression();
        }
    }
}

// TODO: Parenthesis feature
function plusMinusClicked(){

    if(basicOperatorNotClickedPreviously && firstNumber !== ""){
        firstNumber *= -1;
        updateBottomDisplayWithCurrentExpression();
    }

    else if(secondNumber !== ""){
        secondNumber *= -1;
        updateBottomDisplayWithCurrentExpression();
    }
    // if number less then zero, add parenthesis
}

function decimalClicked(){

    // If decimal was NOT Clicked previously AND operator was not
    if(decimalNotClicked && basicOperatorNotClickedPreviously === true){

        decimalNotClicked = false;

        if(firstNumber === ""){
            firstNumber += 0;
        }

        // Add the decimal to First Number
        buildStringFirstNumber();
        updateBottomDisplayWithCurrentExpression();
    }

    // If decimal was NOT Clicked previously AND operator was clicked
    if(decimalNotClicked && basicOperatorNotClickedPreviously === false){

        decimalNotClicked = false;

        if(secondNumber === ""){
            secondNumber += 0;
        }

        // Add the decimal to Second Number
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
    decimalNotClicked = false;

    updateTopDisplayWithPreviousExpression();
    displayTop.innerText += symbolPercent;

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

// TODO: Engineering Notation: firstNumber = Number(firstNumber).toPrecision(3);
function buildStringFirstNumber(){

    // If no result from a previous equation exist, build the first number
    if(resultDoesNotExist){
        
        const zero = "0"

        // CASE 1: Add numbers that are not zero
        if(firstNumber !== zero && buttonClickedValue !== zero){
            firstNumber += buttonClickedValue;
        }
        
        // CASE 2: Add a zero before a decimal if no non zero numbers were clicked previously
        else if(firstNumber === zero && buttonClickedValue === symbolDecimal){
            firstNumber = zero;
            firstNumber += buttonClickedValue;
        }

        // CASE 3: Remove the original zero if no decimal was pressed
        else if(firstNumber === zero){
            firstNumber = zero;
            firstNumber += buttonClickedValue;
        }

        // CASE 4: It's ok to add a zero after only if case 3 executes
        else if(buttonClickedValue === zero){
            firstNumber += buttonClickedValue;
        }
    }

    // User wants to build a new FirstNumber after a previous result
    else{
        resetFirstNumber();
        resetDecimalNotClicked();
        resetResultDoesNotExist();
        firstNumber += buttonClickedValue;
    }
}

// TODO: Engineering Notation:  secondNumber = Number(secondNumber).toPrecision(3);
function buildStringSecondNumber(){

    const zero = "0"

    // CASE 1: Add numbers that are not zero
    if(secondNumber !== zero && buttonClickedValue !== zero){
        secondNumber += buttonClickedValue;
    }
    
    // CASE 2: Add a zero before a decimal if no non zero numbers were clicked previously
    else if(secondNumber === zero && buttonClickedValue === symbolDecimal){
        secondNumber = "0"
        secondNumber += buttonClickedValue;
    }

    // CASE 3: Remove the original zero if no decimal was pressed
    else if(secondNumber === zero){
        secondNumber = "";
        secondNumber += buttonClickedValue;
    }

    // CASE 4: It's ok to add a zero after only if case 3 executes
    else if(buttonClickedValue === zero){
        secondNumber += buttonClickedValue;
    }
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
    resetDecimalNotClicked();
    resetResultDoesNotExist();
}

function resetVariablesAfterCalculation(){
    setFirstNumberWithResult();
    resetSecondNumber();
    resetOperator();
    resetOperatorNotClickedPreviously();
    decimalNotClicked = false;
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

function resetDecimalNotClicked(){
    decimalNotClicked = true;
}

function resetResultDoesNotExist(){
    resultDoesNotExist = true;
}

// ---------------------------------------------
// ---------------------------------------------
//
// Feature ---> Equals clicked AGAIN with only one operator
// Feature ---> Parenthesis around negative number for second number (build parenthesis)
// Feature ---> Engineering Notation
// Feature ---> square, percent, square root on top display
//
// ---------------------------------------------
// ---------------------------------------------
