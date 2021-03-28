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
let repeaterFirstNumber = "";
let repeaterBasicOperator = "";

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
const symbolClear = "C";
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

        case symbolClear:
            clearClicked();
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

function numberClicked(){

    // Handle First Number
    if(basicOperatorNotClickedPreviously){
        buildStringFirstNumber();
        updateBottomDisplayWithCurrentExpression();
    }

    // Handle Second Number
    else{
        buildStringSecondNumber();
        updateBottomDisplayWithCurrentExpression();
    }
}

function basicOperatorClicked(){

    // CASE: Basic operator clicked and first number empty
    if(firstNumber === ""){

        firstNumber = "0";
    }

    // Set the equals button repeat feature
    repeaterFirstNumber = firstNumber;
    repeaterBasicOperator = operator;

    // CASE 1: A basic operator was NOT Clicked previously
    if(basicOperatorNotClickedPreviously){
        basicOperatorClickedSetOperator();
    }

    // CASE 2: A basic operator was Clicked previously
    else{
        basicOperatorClickedPreviously();
    }
}

function basicOperatorClickedSetOperator(){

    basicOperatorNotClickedPreviously = false;

    setOperator();
    updateBottomDisplayWithCurrentExpression();
    resetDecimalNotClicked();
}

function basicOperatorClickedPreviously(){

    // CASE 1: No second number was entered
    if(secondNumber === ""){
        setOperator();
        updateBottomDisplayWithCurrentExpression();
    }

    // CASE 2: There is a second number
    if(secondNumber !== "" && isValidResultEqualsPressed()){
        resetDecimalNotClicked();
        resetSecondNumber();
        setFirstNumberWithResult();
        setOperator();
        updateBottomDisplayWithCurrentExpression();
    }
}

function equalsClicked(){

    // CASE 1: There is a complete expression
    if(firstNumber !== "" && operator !== "" && secondNumber !== ""){
        
        if(isValidResultEqualsPressed()){

            // Set up the repeater variables
            repeaterFirstNumber = secondNumber;
            repeaterBasicOperator = operator;

            updateBottomDisplayWithResult();
            resetVariablesAfterCalculation();
        }
    }

    // CASE 2: There is only a first number and operator
    else if(firstNumber !== "" && operator !== ""){

        secondNumber = repeaterFirstNumber;

        if(isValidResultEqualsPressed()){
            resetSecondNumber();
            setFirstNumberWithResult();
            updateBottomDisplayWithCurrentExpression();
            resetDecimalNotClicked();
        }
    }

    // CASE 3: There is only a first number but a repeater was setup
    else if(repeaterFirstNumber != "" && repeaterBasicOperator !== "") {

        secondNumber = repeaterFirstNumber;
        operator = repeaterBasicOperator;

        if(isValidResultEqualsPressed()){

            basicOperatorNotClickedPreviously = false;

            resetSecondNumber();
            setFirstNumberWithResult();
            updateBottomDisplayWithCurrentExpression();
            resetDecimalNotClicked();
        }
    }
}

function allClearClicked(){
    updateTopAndBottomDisplayAllClear();
    resetVariablesAllClearClicked();
}

function clearClicked(){

    // CASE 1: Clear the second number
    if(secondNumber !== ""){

        let temp_1 = firstNumber;
        let temp_2 = operator;

        resetVariablesAfterCalculation();

        firstNumber = temp_1;
        operator = temp_2;

        updateBottomDisplayWithCurrentExpression();
    }

    // CASE 2: Clear the operator
    else if(operator !== ""){

        let temp = firstNumber;

        resetVariablesAllClearClicked();

        firstNumber = temp;

        updateBottomDisplayWithCurrentExpression();
    }

    // CASE 3: Clear the first number
    else if(firstNumber !== ""){

        resetVariablesAllClearClicked();

        firstNumber = "0";

        updateBottomDisplayWithCurrentExpression();
        setAllClearButton();
    }

    // CASE 4: Clear any error message no the display
    else if(displayBottom.innerText === "Error"){

        updateBottomDisplayWithCurrentExpression();
        setAllClearButton();
    }
}

function squareRootClicked(){

    // Handle First Number
    if(basicOperatorNotClickedPreviously && isValidSquareRoot(firstNumber)){
        setFirstNumberWithResult();
        resetVariablesAfterCalculation();
        updateBottomDisplayWithCurrentExpression();
    }

    // Handle Second Number
    else if(secondNumber !== "" && isValidSquareRoot(secondNumber)){

        setSecondNumberWithResult();

        result = calculateExpression();

        updateBottomDisplayWithCurrentExpression();
        resetVariablesAfterCalculation();
        updateBottomDisplayWithCurrentExpression();
    }
}

function squaredClicked(){

    // Handle First number
    if(basicOperatorNotClickedPreviously && isValidSquare(firstNumber)){
        setFirstNumberWithResult();
        resetVariablesAfterCalculation();
        updateBottomDisplayWithCurrentExpression();
    }

    // Handle Second Number
    else if(secondNumber !== "" && isValidSquare(secondNumber)){

        setSecondNumberWithResult();

        result = calculateExpression();

        resetVariablesAfterCalculation();
        updateBottomDisplayWithCurrentExpression();
    }
}

function percentClicked(){

    // Handle First Number
    if(basicOperatorNotClickedPreviously && isValidPercent(firstNumber)){
        setFirstNumberWithResult();
        resetVariablesAfterCalculation();
        updateBottomDisplayWithCurrentExpression();
    }
    
    // Handle Second Number
    else if(isValidPercent(secondNumber)){

        setSecondNumberWithResult();

        result = calculateExpression();

        resetVariablesAfterCalculation();
        updateBottomDisplayWithCurrentExpression();
    }
}

function plusMinusClicked(){

    // Handle First Number
    if(basicOperatorNotClickedPreviously && firstNumber !== ""){

        firstNumber *= -1;

        updateBottomDisplayWithCurrentExpression();
    }

    // Handle Second Number
    else if(secondNumber !== ""){

        secondNumber *= -1;

        updateBottomDisplayWithCurrentExpression();
    }
}

function decimalClicked(){

    // Handle First Number
    if(decimalNotClicked && basicOperatorNotClickedPreviously === true){

        decimalNotClicked = false;

        if(firstNumber === ""){
            firstNumber += 0;
        }

        // Add the decimal to First Number
        buildStringFirstNumber();
        updateBottomDisplayWithCurrentExpression();
    }

    // Handle Second Number
    if(decimalNotClicked && basicOperatorNotClickedPreviously === false){

        decimalNotClicked = false;

        if(secondNumber === ""){
            secondNumber += 0;
        }

        // Add the decimal to Second Number
        buildStringSecondNumber();
        updateBottomDisplayWithCurrentExpression();
    }

    // Handle no non zeros clicked
    if(resultDoesNotExist === false){

        resetVariablesAfterCalculation();

        firstNumber = "0" + buttonClickedValue;

        resetResultDoesNotExist();
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

function isValidResultEqualsPressed(){

    // Update the top part of the display
    updateTopDisplayWithPreviousExpression();
    updateTopDisplayWithEqualsSymbol();

    result = calculateExpression();
    
    return isValidResult();
}

function isValidSquare(number){

    // Update the top part of the display
    updateTopDisplayWithPreviousExpression();
    displayTop.innerText += symbolSquared_2;
    updateTopDisplayWithEqualsSymbol();

    result = Number(number * number);

    return isValidResult();
}

function isValidPercent(number){
    
    // Update the top part of the display
    updateTopDisplayWithPreviousExpression();
    displayTop.innerText += symbolPercent;
    updateTopDisplayWithEqualsSymbol();

    result = number *= 0.01;

    return isValidResult();
}

function isValidSquareRoot(number){

    // Update the top part of the display
    if(secondNumber !== ""){
        displayTop.innerText = firstNumber + " " + operator;
        displayTop.innerText += " " + symbolSquareRoot + " " + secondNumber;
        updateTopDisplayWithEqualsSymbol();
    }
    else{
        displayTop.innerText = symbolSquareRoot + " " + firstNumber;
        updateTopDisplayWithEqualsSymbol();
    }

    result = Math.sqrt(Number(number));

    return isValidResult();
}

function isValidResult(){

    if(isNaN(result)){
        updateBottomDisplayWithErrorMessage();
        resetVariablesAllClearClicked();
        return false;
    }

    return true;
}

// ┌───────────────────────────────┐
// │   String Building Functions   │	
// └───────────────────────────────┘

function buildStringFirstNumber(){

    // If no result from a previous equation exist, build the first number
    if(resultDoesNotExist){

        const zero = "0";

        // CASE 1: Add numbers that are not zero
        if(firstNumber !== zero && buttonClickedValue !== zero){
            firstNumber += buttonClickedValue;
        }
        
        // CASE 2: Add a zero before a decimal if no non zero numbers were clicked previously
        else if(firstNumber === zero && buttonClickedValue === symbolDecimal){
            firstNumber = zero;
            firstNumber += buttonClickedValue;
        }

        // CASE 3: Remove any starting zero if no decimal was pressed
        else if(firstNumber === zero){
            resetFirstNumber();
            firstNumber += buttonClickedValue;
        }

        // CASE 4: It's ok to add a zero after only if case 3 executes
        else if(buttonClickedValue === zero){
            firstNumber += buttonClickedValue;
        }
        
        setClearButton();
    }

    // If result exist then user wants to build a new FirstNumber
    else{
        
        resetFirstNumber();
        resetDecimalNotClicked();
        resetResultDoesNotExist();

        firstNumber = buttonClickedValue;
    }
}

function buildStringSecondNumber(){

    const zero = "0";

    // CASE 1: Add numbers that are not zero
    if(secondNumber !== zero && buttonClickedValue !== zero){
        secondNumber += buttonClickedValue;
    }
    
    // CASE 2: Add a zero before a decimal if no non zero numbers were clicked previously
    else if(secondNumber === zero && buttonClickedValue === symbolDecimal){
        secondNumber = zero;
        secondNumber += buttonClickedValue;
    }

    // CASE 3: Remove any starting zero if no decimal was pressed
    else if(secondNumber === zero){

        resetSecondNumber();

        secondNumber += buttonClickedValue;
    }

    // CASE 4: It's ok to add a zero only if case 3 executes
    else if(buttonClickedValue === zero){
        secondNumber += buttonClickedValue;
    }
}

// ┌──────────────────────────────┐
// │   Update Display Functions   │	
// └──────────────────────────────┘

function updateBottomDisplayWithResult(){

    if(result < 0){
        displayBottom.innerText = "(" + result + ")";
    }
    else{
        displayBottom.innerText = result; 
    }
}

function updateTopDisplayWithEqualsSymbol(){

    displayTop.innerText += " " + symbolEquals;
}

function updateTopAndBottomDisplayAllClear() {

    displayBottom.innerHTML = "0";
    displayTop.innerHTML = "";
}

function updateBottomDisplayWithErrorMessage(){

    displayBottom.innerText = "Error";
}

function updateBottomDisplayWithCurrentExpression(){

    if(firstNumber < 0 && secondNumber < 0){
        displayBottom.innerText = "(" + firstNumber + ")" + " " + operator + " " + "(" + secondNumber + ")";
    }
    else if(firstNumber < 0){
        displayBottom.innerText = "(" + firstNumber + ")" + " " + operator + " " + secondNumber;
    }
    else if(secondNumber < 0){
        displayBottom.innerText = firstNumber + " " + operator + " " + "(" + secondNumber + ")";
    }
    else{
        displayBottom.innerText = firstNumber + " " + operator + " " + secondNumber;
    }
}

function updateTopDisplayWithPreviousExpression(){

    if(firstNumber < 0 && secondNumber < 0){
        displayTop.innerText = "(" + firstNumber + ")" + " " + operator + " " + "(" + secondNumber + ")";
    }
    else if(firstNumber < 0){
        displayTop.innerText = "(" + firstNumber + ")" + " " + operator + " " + secondNumber;
    }
    else if(secondNumber < 0){
        displayTop.innerText = firstNumber + " " + operator + " " + "(" + secondNumber + ")";
    }
    else{
        displayTop.innerText = firstNumber + " " + operator + " " + secondNumber;
    }
}

// ┌─────────────────────────────┐
// │   Set And Reset Functions   │	
// └─────────────────────────────┘

function setOperator(){
    operator = buttonClickedValue;
}

function setFirstNumberWithResult(){
    firstNumber = result;
}

function setSecondNumberWithResult(){
    secondNumber = result;
}

function setAllClearButton(){
    document.querySelector("#button-ac").innerText = symbolAllClear;
}

function setClearButton(){
    document.querySelector("#button-ac").innerText = symbolClear;
}

function resetVariablesAllClearClicked(){
    resetFirstNumber();
    resetSecondNumber();
    resetOperator();
    resetOperatorNotClickedPreviously();
    resetDecimalNotClicked();
    resetResultDoesNotExist();
    repeaterFirstNumber = "";
    repeaterBasicOperator = "";
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
