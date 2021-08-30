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
