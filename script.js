class Calculator{
    constructor(prevNumText, currentNumText){
        this.prevNumText = prevNumText
        this.currentNumText = currentNumText
        this.clear();
    }
    clear(){
        this.currentNum = 0;
        this.prevNum = '';
        this.operation = undefined;
    }

    delete(){
        //deletes the last character in the input
        this.currentNum = this.currentNum.toString().slice(0, -1);
    }

    //Adds number to the input element every time a number is pressed
    //Until an operator is pressed
    appendNumber(num){
        //checks if a decimal is present and if so prevents additional decimals
        if(num === '.' && this.currentNum.includes('.')) return
        //Changing to string to avoid pre-mature computation as numbers are being appended
        this.currentNum = this.currentNum.toString() + num.toString();
    }

    //Picks the operation based on the operator pressed by user
    chooseOperation(operation){
        //If operator is selected without numbers, do not execute
        if(this.currentNum === '') return
        //Check if prevNum exists and then run computation
        if(this.prevNum !== ''){
            this.compute();
        }
        //When an operator is clicked, currNumber becomes prev number
        this.operation = operation;
        this.prevNum = this.currentNum;
        this.currentNum = '';
    }

    //Takes the values inside calculator and executes a function based on the operator chosen.
    compute(){
        let computation;
        const prev = parseFloat(this.prevNum);
        const current = parseFloat(this.currentNum);
        if(isNaN(prev) || isNaN(current))return
        switch(this.operation){
            case '+':
                computation = prev + current;
                break
            case '-':
                computation = prev - current;
                break
            case '*':
                computation = prev * current;
                break
            case '/':
                computation = prev / current;
                break 
            default:
                return 
        }
        this.currentNum = computation;
        this.operation = undefined;
        this.prevNum = '';
    }

    
    getDisplayNumber(num){
        //converts number to string for use of commas
        const stringNumber = num.toString();
        //if number starts with decimal the convert to float number
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        //Separates the number before and after decimal for accurate format
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay = '';
        }else {
            //formats number to include appropriate comma to number size
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    //updates the display to show the result of the compute function
    updateDisplay(){
        this.currentNumText.innerText = this.getDisplayNumber(this.currentNum);
        if(this.operation != null){
            this.prevNumText.innerText =
                `${this.getDisplayNumber(this.prevNum)} ${this.operation}`
        }else{
            this.prevNumText.innerText = '';
        }
    }
}

const prevNumText = document.querySelector('.prev-number');
const currentNumText = document.querySelector('.current-number');
const numBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const addBtn = document.querySelector('.add-btn');
const subtractBtn = document.querySelector('.subtract-btn');
const multiplyBtn = document.querySelector('.multiply-btn');
const divideBtn = document.querySelector('.divide-btn');
const equalBtn = document.querySelector('.equal-btn');
const clearBtn = document.querySelector('.clear-btn');
const deleteBtn = document.querySelector('.delete-btn');
const calcInput = document.querySelector('.calc-input');
const decimal = document.querySelector('.decimal');
let displayVal;
let valArr = [];

const calculator = new Calculator(prevNumText, currentNumText)



numBtns.forEach(btn => btn.addEventListener('click', () =>{
    calculator.appendNumber(btn.innerText);
    calculator.updateDisplay();
})
)

operatorBtns.forEach(btn => btn.addEventListener('click', () => {
    calculator.chooseOperation(btn.innerText);
    calculator.updateDisplay();
}))

equalBtn.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

clearBtn.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteBtn.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})

