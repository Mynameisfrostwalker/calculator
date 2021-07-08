const store = document.querySelector("div#store");
const mainDisplay = document.querySelector("div#mainDisplay");
const paraStore = document.createElement("p");
const paraMainDisplay = document.createElement("p");
store.appendChild(paraStore);
mainDisplay.appendChild(paraMainDisplay);

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, numOne, numTwo) {
    return (operator === '+') ? add(numOne, numTwo) :
        (operator === '-') ? subtract(numOne, numTwo) :
        (operator === '*') ? multiply(numOne, numTwo) :
        (operator === '/') ? divide(numOne, numTwo) : undefined
}

let input = [];
let problem = [];

function number(num) {
    if (input.includes(".")) {
        if (num === ".") {
            return;
        }
    }
    input.push(num);
}

function operation(operator) {
    let joined = input.join('');
    if (joined !== '') {
        problem.push(joined);
    }
    input = [];
    if (problem.length !== 0 || /[+-]/.test(operator)) {
        input.push(operator);
    }
    let operatorJoined = input.join("");
    if (/[*+-\/](?![0-9])/g.test(problem[problem.length - 1]) && /[*\/]/.test(operator)) {
        problem[problem.length - 1] = operatorJoined;
        input = [];
        return;
    }
    if (operatorJoined !== "" && /[\d]/.test(problem[problem.length - 1])) {
        problem.push(operatorJoined);
        input = [];
    }
}

function backspace() {
    if (input.length === 0) {
        input = problem[problem.length - 1].split("")
        problem.pop();
        input.pop()
    } else {
        input.pop()
    }
}

function clear() {
    problem = [];
    input = [];
}

function equals() {
    let join = input.join("");
    if (join !== "") {
        problem.push(join);
        input = []
    }
    if (problem.length <= 3) {
        let finalResult = operate(problem[1], parseInt(problem[0]), parseInt(problem[2]));
        problem = [];
        input = finalResult.toString().split("");
    }
}

function resolve() {
    let finalResult = operate(problem[1], parseInt(problem[0]), parseInt(problem[2]));
    problem.splice(0, 3, problem[0] = finalResult);
}

function calculate(event) {
    let regex = /[*+-\/]/g;
    let numreg = /[0-9.]/;
    if (numreg.test(event.target.id)) {
        number(event.target.id)
    }
    if (regex.test(event.target.id)) {
        operation(event.target.id)
    }

    if (event.target.id === "backspace") {
        backspace()
    }

    if (event.target.id === "clear") {
        clear()
    }

    if (event.target.id === "equals") {
        equals()
    }
    let numOfNum = 0;
    for (let i = 0; i < problem.length; i++) {
        if (/[0-9]/.test(parseInt(problem[i]))) {
            numOfNum += 1
            if (numOfNum === 2) {
                resolve()
            }
        }
    }
    let joinInput = input.join("");
    let joinProblem = problem.join("");
    paraMainDisplay.textContent = joinInput;
    paraStore.textContent = joinProblem;
}

const buttons = document.querySelectorAll('div.buttons')
buttons.forEach((button) => { button.addEventListener('click', calculate) })
    /* create a nodelist of every button, 
    iterate through each button and add an event listener, 
    event listener calls a function fde on click. 
    fde stores event.id in an array when the array 
    length is 3 its contents are passed into the operate
    function the out put is added as the first item of the array
    and the process is repeated until the equal to button is pressed
    */