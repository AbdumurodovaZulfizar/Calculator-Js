let firstNum = '';
let secondNum = '';
let MainOperator = null;
let reset = false;

const allNumbers = document.querySelectorAll('[data-number]');
const allOperators = document.querySelectorAll('[data-operator]');
const equalsBtn = document.getElementById('equalBtn');
const clearBtn = document.getElementById('clearBtn');
const deleteBtn = document.getElementById('deleteBtn');
const pointBtn = document.getElementById('pointBtn');
const mini = document.querySelector('.mini');
const bigger = document.querySelector('.bigger')


const handleKeyboardInput = (e) => {
  if (e.key >= 0 && e.key <= 9) { appendNumber(e.key) };
  if (e.key === '.') { appendPoint() };
  if (e.key === '=' && e.key === 'Enter') { evaluate() };
  if (e.key === 'Backspace') { deleteNumber() };
  if (e.key === 'Escape') { clear() };
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') { setOperation(convertOperation(e.key)) };
}

const evaluate = () => {
  if (MainOperator === null || reset )  { return };
  if (MainOperator === '÷' && bigger.textContent === '0') {
    alert(`You can't devide by zero!`)
    return;
  }
  secondNum = bigger.textContent;
  bigger.textContent = RoundResult(operate(MainOperator, firstNum, secondNum));
  mini.textContent =`${firstNum} ${MainOperator} ${secondNum} =`;
  MainOperator = null;
}

const deleteNumber = () => {
  bigger.textContent = bigger.textContent.toString().slice(0, -1)
}

const clear = () => {
  bigger.textContent = '0';
  mini.textContent = '';
  firstNum = '';
  secondNum = '';
  MainOperator = null;
}


const appendPoint = () => {
  if(reset) { resetScreen() };
  if (bigger.textContent === '') 
  { bigger.textContent = '0' };
  if (bigger.textContent.includes('.')) 
  return bigger.textContent += '.' 
}

window.addEventListener('keydown', handleKeyboardInput);
equalsBtn.addEventListener('click', evaluate);
clearBtn.addEventListener('click', clear);
deleteBtn.addEventListener('click', deleteNumber);
pointBtn.addEventListener('click', appendPoint);

allNumbers.forEach((button) =>
  button.addEventListener('click', () => appendNumber(button.textContent))
)

allOperators.forEach((button) =>
  button.addEventListener('click', () => setOperation(button.textContent))
)

const appendNumber = (number) => {
  if (bigger.textContent === '0' || reset) { resetScreen() };
  bigger.textContent += number;
}

const resetScreen = () => {
  bigger.textContent = "";
  reset = false;
}

const convertOperation = (operation) => {
  if (operation === "/") { return "÷" };
  if (operation === "*") { return "×" };
  if (operation === "-") { return "-" };
  if (operation === "+") { return "+" };
}

const setOperation = (operation) => {
  if (MainOperator !== null ) { evaluate() };
  firstNum = bigger.textContent;
  MainOperator = operation;
  mini.textContent = `${firstNum} ${MainOperator}`;
  reset = true;
}

function RoundResult(number) {
  return Math.round(number * 1000) / 1000
}

const add = (...args) => {
  return args.reduce((sum, num) => sum + num);
};

const substract = (x, y) => {
  return x - y;
}

const multiply = (...args) => {
  return args.reduce((mul, num) => mul * num)
};

const divide = (x, y) => {
  return x/y;
}

const operate = (operation, x, y) => {
  x = Number(x);
  y = Number(y);
  if (operation === "+") {
    return add(x, y);
  } else if (operation === "-") {
    return substract(x, y);
  } else if (operation === "×") {
    return multiply(x, y);
  } else if (operation === "÷") {
    if ( y === 0) {
      return null;
    }
    return divide(x, y);
  } else {
    return null;
  }
}