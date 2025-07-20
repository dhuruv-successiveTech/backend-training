# TypeScript

TypeScript is a **strongly typed** programming language that builds on JavaScript by adding **static type definitions**. It helps developers catch errors early through a robust type system and improves tooling with features like **autocompletion**, **navigation**, and **refactoring**.

TypeScript code is **transpiled** to JavaScript, which means it runs anywhere JavaScript runs — in the browser, Node.js, and more.

---

## Why Use TypeScript?

- **Type Safety**: Detects errors at compile-time rather than runtime.
- **Better IDE Support**: TypeScript offers advanced code completion, navigation, and refactoring.
- **Readability and Maintainability**: Code is easier to understand with types.
- **Large-Scale Applications**: Encourages scalable architecture and helps in managing large codebases.

---

## Getting Started

To install TypeScript globally:

```bash
npm install -g typescript
```

To compile a TypeScript file:

```bash
tsc filename.ts
```

---

## Basic Types in TypeScript

TypeScript offers a wide variety of basic types:

### 1. `number`
All numbers in TypeScript are floating-point values.

```ts
let count: number = 42;
```

### 2. `string`
Textual data.

```ts
let message: string = "Hello, TypeScript!";
```

### 3. `boolean`
Represents a true/false value.

```ts
let isLoggedIn: boolean = true;
```

### 4. `null` and `undefined`

```ts
let u: undefined = undefined;
let n: null = null;
```

### 5. `any`
A type that disables type checking.

```ts
let notSure: any = "Could be anything";
notSure = 5; // still valid
```

### 6. `unknown`
A safer alternative to `any`. You must perform type checking before performing operations.

```ts
let value: unknown = "Hello";
if (typeof value === "string") {
  console.log(value.toUpperCase());
}
```

### 7. `void`
Used for functions that don’t return a value.

```ts
function logMessage(): void {
  console.log("Logging message...");
}
```

### 8. `never`
Represents values that never occur (e.g., a function that always throws an error).

```ts
function throwError(): never {
  throw new Error("This will never return");
}
```

### 9. `array`
Two syntaxes:

```ts
let list1: number[] = [1, 2, 3];
let list2: Array<string> = ["a", "b", "c"];
```

### 10. `tuple`
An array with fixed types and length.

```ts
let user: [string, number] = ["Alice", 30];
```

### 11. `enum`
Enumerated type.

```ts
enum Color {
  Red,
  Green,
  Blue,
}

let c: Color = Color.Green;
```

### 12. `object`

```ts
let person: { name: string; age: number } = {
  name: "Bob",
  age: 25,
};
```

---

## Variables in TypeScript

### Declaring Variables

TypeScript uses the same variable declaration keywords as JavaScript: `let`, `const`, and `var`. But with types.

```ts
let firstName: string = "John";
const age: number = 25;
var isAdmin: boolean = false;
```

### Type Inference

TypeScript automatically infers the type if it can be determined from the initializer.

```ts
let greeting = "Hello"; // inferred as string
```

### Explicit Typing

You can explicitly specify a variable's type using a colon `:` followed by the type.

```ts
let score: number;
score = 99;
```

---

## Type Assertions

You can override TypeScript’s inferred type using **type assertions**:

```ts
let someValue: unknown = "This is a string";

let strLength: number = (someValue as string).length;
// or
let strLengthAlt: number = (<string>someValue).length;
```

---

## Summary

- TypeScript is a superset of JavaScript with strong typing.
- It provides static type checking which helps in reducing bugs.
- Basic types include `string`, `number`, `boolean`, `null`, `undefined`, `any`, `unknown`, `void`, `never`, `array`, `tuple`, and `enum`.
- TypeScript supports both **type inference** and **explicit typing**.
- TypeScript encourages writing cleaner, more maintainable, and bug-resistant code.

---

## Further Reading

- [TypeScript Official Docs](https://www.typescriptlang.org/docs/)
- [Playground](https://www.typescriptlang.org/play) to test TypeScript code online.