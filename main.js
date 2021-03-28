// ┌──────────────────────┐
// │   Global Variables   │	
// └──────────────────────┘

let firstNumber = "";
let secondNumber = "";
let operator = "";
let buttonClickedValue = "";
let answer = "";
let decimalNotClicked = true;
let answerDoesNotExist = true;
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

// ┌─────────────────────┐
// │   Event Listeners   │	
// └─────────────────────┘

// Set button event listeners
setEventListeners();

function setEventListeners(){

    // Get all Buttons
    const allButtons = document.querySelectorAll(".calc-button");

    // Set all Buttons
    for(let i = 0; i < allButtons.length; i++){
        allButtons[i].addEventListener("click", buttonClickedReadValue);
    }
}

// ┌──────────────────────┐
// │   Read User Choice   │	
// └──────────────────────┘

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

    // CASE: If an answer exist, update the top display
    if(answerDoesNotExist !== true){
        updateTopDisplayWithAnswer();
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
    if(secondNumber !== "" && isValidAnswerEqualsClicked()){
        resetDecimalNotClicked();
        resetSecondNumber();
        setFirstNumberWithAnswer();
        setOperator();
        updateBottomDisplayWithCurrentExpression();
        updateTopDisplayWithAnswer();
    }
}

function equalsClicked(){

    // CASE 1: There is a complete expression
    if(firstNumber !== "" && operator !== "" && secondNumber !== ""){
        
        if(isValidAnswerEqualsClicked()){

            // Refresh the equals button repeat feature
            repeaterFirstNumber = secondNumber;
            repeaterBasicOperator = operator;

            updateBottomDisplayWithAnswer();
            resetVariablesAfterCalculation();
        }
    }

    // CASE 2: There is only a first number and operator
    else if(firstNumber !== "" && operator !== ""){

        secondNumber = repeaterFirstNumber;

        if(isValidAnswerEqualsClicked()){
            resetSecondNumber();
            setFirstNumberWithAnswer();
            updateBottomDisplayWithCurrentExpression();
            //updateTopDisplayWithAnswer();
            resetDecimalNotClicked();
        }
    }

    // CASE 3: There is only a first number but a repeater was setup
    else if(repeaterFirstNumber != "" && repeaterBasicOperator !== "") {

        secondNumber = repeaterFirstNumber;
        operator = repeaterBasicOperator;

        if(isValidAnswerEqualsClicked()){

            basicOperatorNotClickedPreviously = false;

            resetSecondNumber();
            setFirstNumberWithAnswer();
            updateBottomDisplayWithCurrentExpression();
            //updateTopDisplayWithAnswer();
            resetDecimalNotClicked();
            setClearButton();
        }
    }
}

function allClearClicked(){
    updateTopAndBottomDisplayAllClear();
    resetVariablesAllClearClicked();
}

function clearClicked(){

    // CASE 1: Clear the second number
    if(secondNumber !== "" && operator !== ""){

        let temp_1 = firstNumber;
        let temp_2 = operator;

        resetVariablesAfterCalculation();

        firstNumber = temp_1;
        operator = temp_2;

        basicOperatorNotClickedPreviously = false;

        updateBottomDisplayWithCurrentExpression();
    }

    // CASE 2: Clear the operator
    else if(operator !== "" && firstNumber !== ""){

        let temp = firstNumber;

        resetVariablesAfterCalculation();

        firstNumber = temp;

        updateBottomDisplayWithCurrentExpression();
    }

    // CASE 3: Clear the first number
    else if(firstNumber !== ""){

        let temp_1 = repeaterFirstNumber;
        let temp_2 = repeaterBasicOperator;

        resetVariablesAllClearClicked();

        firstNumber = "0";

        repeaterFirstNumber = temp_1;
        repeaterBasicOperator = temp_2;

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
        setFirstNumberWithAnswer();
        resetVariablesAfterCalculation();
        updateBottomDisplayWithCurrentExpression();
    }

    // Handle Second Number
    else if(secondNumber !== "" && isValidSquareRoot(secondNumber)){

        setSecondNumberWithAnswer();

        answer = calculateExpression();

        updateBottomDisplayWithCurrentExpression();
        resetVariablesAfterCalculation();
        updateBottomDisplayWithCurrentExpression();
    }
}

function squaredClicked(){

    // Handle First number
    if(basicOperatorNotClickedPreviously && isValidSquare(firstNumber)){
        setFirstNumberWithAnswer();
        resetVariablesAfterCalculation();
        updateBottomDisplayWithCurrentExpression();
    }

    // Handle Second Number
    else if(secondNumber !== "" && isValidSquare(secondNumber)){

        setSecondNumberWithAnswer();

        answer = calculateExpression();

        resetVariablesAfterCalculation();
        updateBottomDisplayWithCurrentExpression();
    }
}

function percentClicked(){

    if(firstNumber === ""){
        firstNumber = "0";
    }

    // Handle First Number
    if(basicOperatorNotClickedPreviously && isValidPercent(firstNumber)){
        setFirstNumberWithAnswer();
        resetVariablesAfterCalculation();
        updateBottomDisplayWithCurrentExpression();
    }
    
    // Handle Second Number
    else{

        if(secondNumber === ""){
            secondNumber = "0";
        }
        
        if(isValidPercent(secondNumber)){
            setSecondNumberWithAnswer();

            answer = calculateExpression();
    
            resetVariablesAfterCalculation();
            updateBottomDisplayWithCurrentExpression();
        }
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
    if(answerDoesNotExist === false){

        resetVariablesAfterCalculation();

        firstNumber = "0" + buttonClickedValue;

        resetAnswerDoesNotExist();
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

function isValidAnswerEqualsClicked(){

    // Update the top part of the display
    updateTopDisplayWithPreviousExpression();
    updateTopDisplayWithEqualsSymbol();

    answer = calculateExpression();
    
    return isValidAnswer();
}

function isValidSquare(number){

    if(number === ""){
        number = "0"
    }

    // Update the top part of the display
    updateTopDisplayWithPreviousExpression();
    displayTop.innerText += symbolSquared_2;
    updateTopDisplayWithEqualsSymbol();

    answer = Number(number * number);

    return isValidAnswer();
}

function isValidPercent(number){
    
    // Update the top part of the display
    updateTopDisplayWithPreviousExpression();
    displayTop.innerText += symbolPercent;
    updateTopDisplayWithEqualsSymbol();

    answer = Number(number * 0.01);

    return isValidAnswer();
}

function isValidSquareRoot(number){

    // CASE 1: There is a second number
    if(secondNumber !== ""){
        displayTop.innerText = firstNumber + " " + operator;
        displayTop.innerText += " " + symbolSquareRoot + " " + secondNumber;
        updateTopDisplayWithEqualsSymbol();
    }

    // CASE 2: There is no second number
    else{
        displayTop.innerText = symbolSquareRoot + " " + firstNumber;
        updateTopDisplayWithEqualsSymbol();
    }

    answer = Math.sqrt(Number(number));

    return isValidAnswer();
}

function isValidAnswer(){

    if(isNaN(answer)){
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

    if(answerDoesNotExist !== true){
        updateTopDisplayWithAnswer();
    }

    // CASE 1: No answer from a previous equation exist, build first number
    if(answerDoesNotExist){

        const zero = "0";

        // CASE 1: Add numbers that are not zero
        if(firstNumber !== zero && buttonClickedValue !== zero){
            firstNumber += buttonClickedValue;
        }
        
        // CASE 2: Add a zero before a decimal if no non zero numbers exist
        else if(firstNumber === zero && buttonClickedValue === symbolDecimal){
            firstNumber = zero;
            firstNumber += buttonClickedValue;
        }

        // CASE 3: Remove any starting zero if no decimal was clicked
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

    // CASE 2: A answer exist, but the user wants to build a new FirstNumber
    else{

        resetFirstNumber();
        resetDecimalNotClicked();
        resetAnswerDoesNotExist();

        firstNumber = buttonClickedValue;
    }
}

function buildStringSecondNumber(){

    if(answerDoesNotExist !== true){
        updateTopDisplayWithAnswer();
    }

    const zero = "0";

    // CASE 1: Add numbers that are not zero
    if(secondNumber !== zero && buttonClickedValue !== zero){
        secondNumber += buttonClickedValue;
    }
    
    // CASE 2: Add a zero before a decimal if no non zero numbers exist
    else if(secondNumber === zero && buttonClickedValue === symbolDecimal){
        secondNumber = zero;
        secondNumber += buttonClickedValue;
    }

    // CASE 3: Remove any starting zero if no decimal was clicked
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

function updateTopDisplayWithAnswer(){

    displayTop.innerText = `Ans ${symbolEquals} ${answer}`;
}

function updateBottomDisplayWithAnswer(){

    if(answer < 0){
        displayBottom.innerText = "(" + answer + ")";
    }
    else{
        displayBottom.innerText = answer; 
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

function setNumberFormat(number){

    if(number.length > 9){
        return Number(number).toExponential(6);
    }

    return number;
}

function updateBottomDisplayWithCurrentExpression(){

    const firstNumber_d = setNumberFormat(firstNumber);
    const secondNumber_d = setNumberFormat(secondNumber);

    if(displayBottom.innerText === "Error"){
        displayTop.innerText = "";
    }

    if(firstNumber < 0 && secondNumber < 0){
        displayBottom.innerText = "(" + firstNumber_d + ")";
        displayBottom.innerText += " " + operator;
        displayBottom.innerText += " " + "(" + secondNumber_d + ")";
    }
    else if(firstNumber < 0){
        displayBottom.innerText = "(" + firstNumber_d + ")";
        displayBottom.innerText += " " + operator;
        displayBottom.innerText += " " + secondNumber_d;
    }
    else if(secondNumber < 0){
        displayBottom.innerText = firstNumber_d;
        displayBottom.innerText += " " + operator;
        displayBottom.innerText += " " + "(" + secondNumber_d + ")";
    }
    else{
        displayBottom.innerText = firstNumber_d;
        displayBottom.innerText += " " + operator;
        displayBottom.innerText += " " + secondNumber_d;
    }
}

function updateTopDisplayWithPreviousExpression(){

    if(firstNumber < 0 && secondNumber < 0){
        displayTop.innerText = "(" + firstNumber + ")";
        displayTop.innerText += " " + operator;
        displayTop.innerText += " " + "(" + secondNumber + ")";
    }
    else if(firstNumber < 0){
        displayTop.innerText = "(" + firstNumber + ")";
        displayTop.innerText += " " + operator;
        displayTop.innerText += " " + secondNumber;
    }
    else if(secondNumber < 0){
        displayTop.innerText = firstNumber;
        displayTop.innerText += " " + operator;
        displayTop.innerText += " " + "(" + secondNumber + ")";
    }
    else{
        displayTop.innerText = firstNumber;
        displayTop.innerText +=  " " + operator;
        displayTop.innerText += " " + secondNumber;
    }
}

// ┌─────────────────────────────┐
// │   Set And Reset Functions   │	
// └─────────────────────────────┘

function setOperator(){
    operator = buttonClickedValue;
}

function setFirstNumberWithAnswer(){
    firstNumber = answer;
}

function setSecondNumberWithAnswer(){
    secondNumber = answer;
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
    resetAnswerDoesNotExist();
    repeaterFirstNumber = "";
    repeaterBasicOperator = "";
}

function resetVariablesAfterCalculation(){
    setFirstNumberWithAnswer();
    resetSecondNumber();
    resetOperator();
    resetOperatorNotClickedPreviously();
    decimalNotClicked = false;
    answerDoesNotExist = false;
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

function resetAnswerDoesNotExist(){
    answerDoesNotExist = true;
}
