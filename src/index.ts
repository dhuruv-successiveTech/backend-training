import path from "path";

import fs from "fs";

import { add, div, mult, sub } from "./lib/math.js";

const [input1, input2] = process.argv.slice(2);

const number1 = parseInt(input1);
const number2 = parseInt(input2);

const addition = add(number1, number2);

const multiplication = mult(number1, number2);

const subtraction = sub(number1, number2);

const division = div(number1, number2);

const csvHeader = "Operation,Num1,Num2,result\n";

const csvRows = [
  `Addition,${number1},${number2},${addition}`,
  `Subtraction,${number1},${number2},${subtraction}`,
  `Multiplication,${number1},${number2},${multiplication}`,
  `Division,${number1},${number2},${division}`,
];

const csvContent = csvHeader + csvRows.join("\n");

const filePath = path.resolve("result.csv"); // result.csv is relative path. path.resolve converts to absolute path

fs.writeFileSync(filePath, csvContent, "utf8");

console.log(`Results saved to ${filePath}`);
