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
    return (operator === 'add') ? add(numOne, numTwo) :
        (operator === 'subtract') ? subtract(numOne, numTwo) :
        (operator === 'multiply') ? multiply(numOne, numTwo) :
        (operator === 'divide') ? divide(numOne, numTwo) : undefined
}

function calculate(event) {
    console.log(event)
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