import lodash from "lodash";

const add = (num1, num2) => {
  return lodash.add(num1, num2);
};

const sub = (num1, num2) => {
  return lodash.subtract(num1, num2);
};

const mult = (num1, num2) => {
  return num1 * num2;
};

const div = (num1, num2) => {
  if (num2 === 0) throw new Error("Division by zero is not allowed");
  return num1 / num2;
};

export { add, sub, mult, div };
